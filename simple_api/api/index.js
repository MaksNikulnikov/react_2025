const router = require("express").Router();
const { nanoid } = require("nanoid");
const { restaurants, products, reviews, users } = require("./mock");
const { reply, getById, updateById } = require("./utils");
const { findCreateReviewError } = require("./review-rules");

router.get("/restaurants", (_req, res) => {
  reply(res, restaurants);
});

router.get("/restaurant/:restaurantId", (req, res) => {
  const restaurantId = req.params?.restaurantId;
  let restaurant;

  if (restaurantId) {
    restaurant = getById(restaurants)(restaurantId);
  }

  reply(res, restaurant);
});

router.get("/dishes", (req, res) => {
  const { restaurantId, dishId } = req.query;
  let result = products;

  if (restaurantId) {
    const restaurant = getById(restaurants)(restaurantId);
    if (restaurant) {
      result = restaurant.menu.map(getById(result));
    }
  }

  if (!restaurantId && dishId) {
    result = getById(result)(dishId);
  }
  reply(res, result);
});

router.get("/dish/:dishId", (req, res) => {
  const dishId = req.params?.dishId;
  let product;

  if (dishId) {
    product = getById(products)(dishId);
  }
  reply(res, product);
});

router.get("/reviews", (req, res) => {
  const { restaurantId } = req.query;
  let result = reviews;
  if (restaurantId) {
    const restaurant = getById(restaurants)(restaurantId);
    if (restaurant) {
      result = restaurant.reviews.map(getById(result));
    }
  }
  reply(res, result);
});

router.post("/review/:restaurantId", (req, res) => {
  const body = req.body;
  const restaurantId = req.params?.restaurantId;
  const restaurant = restaurantId && getById(restaurants)(restaurantId);
  const createReviewError = findCreateReviewError({
    restaurant,
    reviews,
    users,
    body,
  });

  if (createReviewError) {
    reply(res, { message: createReviewError.message }, 1000, createReviewError.status);
    return;
  }

  const newReviewId = nanoid();
  const newReview = {
    ...body,
    id: newReviewId,
  };

  restaurant.reviews.push(newReviewId);
  reviews.push(newReview);

  reply(res, newReview);
});

router.patch("/review/:reviewId", (req, res) => {
  const body = req.body;
  const reviewId = req.params?.reviewId;
  const review = reviewId && getById(reviews)(reviewId);

  if (!reviewId || !body) {
    reply(res, { message: "Review update payload is required." }, 1000, 400);
    return;
  }

  if (!review) {
    reply(res, { message: "Review not found." }, 1000, 404);
    return;
  }

  const updatedReview = updateById(reviews)(reviewId, body);

  reply(res, updatedReview);
});

router.get("/users", (_req, res) => {
  reply(res, users);
});

module.exports = router;
