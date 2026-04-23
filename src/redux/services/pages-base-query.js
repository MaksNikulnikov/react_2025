import {
  GITHUB_PAGES_SEED_URL,
} from "../../config/api";

const STORAGE_KEY = "restaurant-explorer-pages-api";

let pagesDataPromise;

const cloneData = (value) => JSON.parse(JSON.stringify(value));

const readStoredData = () => {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const writeStoredData = (value) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

const loadPagesData = async () => {
  const storedData = readStoredData();

  if (storedData) {
    return storedData;
  }

  const response = await fetch(GITHUB_PAGES_SEED_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to load the GitHub Pages seed data.");
  }

  const seedData = await response.json();

  writeStoredData(seedData);

  return seedData;
};

const getPagesData = async () => {
  pagesDataPromise ??= loadPagesData();

  return pagesDataPromise;
};

const findById = (items, id) => items.find((item) => item.id === id);

const createError = (status, message) => ({
  error: {
    status,
    data: { message },
  },
});

const createSuccess = (data) => ({
  data: cloneData(data),
});

const normalizeRequest = (args) => {
  if (typeof args === "string") {
    return {
      url: args,
      method: "GET",
      body: undefined,
    };
  }

  return {
    method: "GET",
    ...args,
  };
};

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `review-${Date.now()}`;
};

const getRestaurantReviews = (restaurant, reviews) =>
  restaurant.reviews.map((reviewId) => findById(reviews, reviewId)).filter(Boolean);

const handleReviewCreation = (data, restaurantId, body) => {
  const restaurant = findById(data.restaurants, restaurantId);

  if (!restaurant) {
    return createError(404, "Restaurant not found.");
  }

  const normalizedText = body?.text?.trim();

  if (!body?.userId || !normalizedText) {
    return createError(400, "Review text and user are required.");
  }

  const reviewAuthor = findById(data.users, body.userId);

  if (!reviewAuthor) {
    return createError(400, "Selected user does not exist.");
  }

  const hasExistingReview = getRestaurantReviews(restaurant, data.reviews).some(
    (review) => review.userId === body.userId,
  );

  if (hasExistingReview) {
    return createError(409, "This user already has a review for the restaurant.");
  }

  const newReviewId = createId();
  const newReview = {
    id: newReviewId,
    userId: body.userId,
    text: normalizedText,
    rating: Number(body.rating),
  };

  restaurant.reviews.push(newReviewId);
  data.reviews.push(newReview);
  writeStoredData(data);

  return createSuccess(newReview);
};

const handleReviewUpdate = (data, reviewId, body) => {
  if (!reviewId || !body) {
    return createError(400, "Review update payload is required.");
  }

  const review = findById(data.reviews, reviewId);

  if (!review) {
    return createError(404, "Review not found.");
  }

  review.text = body.text ?? review.text;
  review.rating = body.rating ?? review.rating;
  writeStoredData(data);

  return createSuccess(review);
};

export const createPagesBaseQuery = () => async (args) => {
  try {
    const data = await getPagesData();
    const request = normalizeRequest(args);
    const requestUrl = new URL(request.url, "https://pages.local");
    const path = requestUrl.pathname.replace(/^\/+|\/+$/g, "");

    if (request.method === "GET" && path === "restaurants") {
      return createSuccess(data.restaurants);
    }

    if (request.method === "GET" && path.startsWith("restaurant/")) {
      const restaurantId = path.split("/")[1];
      return createSuccess(findById(data.restaurants, restaurantId));
    }

    if (request.method === "GET" && path === "dishes") {
      const restaurantId = requestUrl.searchParams.get("restaurantId");
      const dishId = requestUrl.searchParams.get("dishId");

      if (restaurantId) {
        const restaurant = findById(data.restaurants, restaurantId);
        const dishes = restaurant
          ? restaurant.menu.map((id) => findById(data.products, id)).filter(Boolean)
          : [];

        return createSuccess(dishes);
      }

      if (dishId) {
        return createSuccess(findById(data.products, dishId));
      }

      return createSuccess(data.products);
    }

    if (request.method === "GET" && path.startsWith("dish/")) {
      const dishId = path.split("/")[1];
      return createSuccess(findById(data.products, dishId));
    }

    if (request.method === "GET" && path === "reviews") {
      const restaurantId = requestUrl.searchParams.get("restaurantId");

      if (!restaurantId) {
        return createSuccess(data.reviews);
      }

      const restaurant = findById(data.restaurants, restaurantId);
      const reviews = restaurant
        ? restaurant.reviews.map((id) => findById(data.reviews, id)).filter(Boolean)
        : [];

      return createSuccess(reviews);
    }

    if (request.method === "GET" && path === "users") {
      return createSuccess(data.users);
    }

    if (request.method === "POST" && path.startsWith("review/")) {
      const restaurantId = path.split("/")[1];
      return handleReviewCreation(data, restaurantId, request.body);
    }

    if (request.method === "PATCH" && path.startsWith("review/")) {
      const reviewId = path.split("/")[1];
      return handleReviewUpdate(data, reviewId, request.body);
    }

    return createError(404, "GitHub Pages demo endpoint not found.");
  } catch (error) {
    return createError(
      500,
      error instanceof Error
        ? error.message
        : "GitHub Pages demo API failed to initialize.",
    );
  }
};
