const { getById } = require("./utils");

const getRestaurantReviews = (restaurant, reviews) =>
  restaurant.reviews.map(getById(reviews)).filter(Boolean);

const findCreateReviewError = ({ restaurant, reviews, users, body }) => {
  if (!restaurant) {
    return { message: "Restaurant not found.", status: 404 };
  }

  const normalizedText = body?.text?.trim();

  if (!body?.userId || !normalizedText) {
    return { message: "Review text and user are required.", status: 400 };
  }

  const reviewAuthor = getById(users)(body.userId);

  if (!reviewAuthor) {
    return { message: "Selected user does not exist.", status: 400 };
  }

  const hasExistingReview = getRestaurantReviews(restaurant, reviews).some(
    (review) => review.userId === body.userId,
  );

  if (hasExistingReview) {
    return {
      message: "This user already has a review for the restaurant.",
      status: 409,
    };
  }

  return null;
};

module.exports = {
  getRestaurantReviews,
  findCreateReviewError,
};
