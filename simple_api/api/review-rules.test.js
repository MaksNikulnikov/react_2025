const test = require("node:test");
const assert = require("node:assert/strict");
const { restaurants, reviews, users } = require("./mock");
const { getRestaurantReviews, findCreateReviewError } = require("./review-rules");

test("getRestaurantReviews resolves existing review ids and skips missing ones", () => {
  const restaurant = {
    ...restaurants[0],
    reviews: [restaurants[0].reviews[0], "missing-review-id"],
  };

  const result = getRestaurantReviews(restaurant, reviews);

  assert.equal(result.length, 1);
  assert.equal(result[0].id, restaurants[0].reviews[0]);
});

test("findCreateReviewError rejects missing author or text", () => {
  const result = findCreateReviewError({
    restaurant: restaurants[0],
    reviews,
    users,
    body: { userId: "", text: "   " },
  });

  assert.deepEqual(result, {
    message: "Review text and user are required.",
    status: 400,
  });
});

test("findCreateReviewError rejects unknown users", () => {
  const result = findCreateReviewError({
    restaurant: restaurants[0],
    reviews,
    users,
    body: { userId: "unknown-user", text: "Fresh feedback" },
  });

  assert.deepEqual(result, {
    message: "Selected user does not exist.",
    status: 400,
  });
});

test("findCreateReviewError rejects a second review from the same user", () => {
  const existingUserId = reviews.find(
    (review) => review.id === restaurants[0].reviews[0],
  ).userId;

  const result = findCreateReviewError({
    restaurant: restaurants[0],
    reviews,
    users,
    body: { userId: existingUserId, text: "Another attempt" },
  });

  assert.deepEqual(result, {
    message: "This user already has a review for the restaurant.",
    status: 409,
  });
});

test("findCreateReviewError accepts a valid new review payload", () => {
  const availableUser = users.find(
    (user) =>
      !restaurants[0].reviews
        .map((reviewId) => reviews.find((review) => review.id === reviewId))
        .some((review) => review?.userId === user.id),
  );

  const result = findCreateReviewError({
    restaurant: restaurants[0],
    reviews,
    users,
    body: { userId: availableUser.id, text: "Fresh feedback" },
  });

  assert.equal(result, null);
});
