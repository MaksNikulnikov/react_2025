import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getReviews } from "./get-reviews";
import { REQUEST_STATUS } from "../../constants";

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
  requestStatusByRestaurantId: {},
});

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getReviews.pending, (state, { meta }) => {
        state.requestStatusByRestaurantId[meta.arg] = REQUEST_STATUS.PENDING;
      })
      .addCase(getReviews.rejected, (state, { meta }) => {
        state.requestStatusByRestaurantId[meta.arg] = REQUEST_STATUS.REJECTED;
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        entityAdapter.upsertMany(state, payload.reviews);
        state.requestStatusByRestaurantId[payload.restaurantId] =
          REQUEST_STATUS.FULFILLED;
      }),
});

export const {
  selectById: selectReviewById,
  selectIds: selectReviewsIds,
  selectEntities,
  selectAll: selectAllDishes,
} = entityAdapter.getSelectors((state) => state.reviews);

export const selectMultipleReviewsById = (state, ids) =>
  ids.map((id) => selectReviewById(state, id));

export const selectReviewsRequestStatus = (state, restaurantId) => {
  return (
    state.reviews.requestStatusByRestaurantId[restaurantId] ||
    REQUEST_STATUS.IDLE
  );
};
