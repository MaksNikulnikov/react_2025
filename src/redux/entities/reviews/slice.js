import { createSlice } from "@reduxjs/toolkit";
import { normalizedReviews } from "../../../assets/normalized-mock";

const initialState = {
  ids: normalizedReviews.map(({ id }) => id),
  entities: normalizedReviews.reduce((acc, review) => {
    acc[review.id] = review;

    return acc;
  }, {}),
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  selectors: {
    selectReviewById: (state, id) => state.entities[id],
    selectReviewsIds: (state) => state.ids,
  },
});

export const { selectReviewById, selectReviewsIds } = reviewsSlice.selectors;
