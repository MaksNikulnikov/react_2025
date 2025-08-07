import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../../constants";
import { getRestaurants } from "./get-restaurants";
import { getRestaurant } from "./get-restaurant";

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
  requestRestaurantsStatus: REQUEST_STATUS.IDLE,
  requestStatusById: {},
});

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  selectors: {
    selectRequestStatus: (state) => state.requestRestaurantsStatus,
    selectRequestStatusById: (state, id) => state.requestStatusById[id],
  },
  extraReducers: (builder) =>
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.requestRestaurantsStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(getRestaurants.rejected, (state) => {
        state.requestRestaurantsStatus = REQUEST_STATUS.REJECTED;
      })
      .addCase(getRestaurants.fulfilled, (state, { payload }) => {
        state.requestRestaurantsStatus = REQUEST_STATUS.FULFILLED;
        entityAdapter.setAll(state, payload);
      })
      .addCase(getRestaurant.pending, (state, { meta }) => {
        state.requestStatusById[meta.arg] = REQUEST_STATUS.PENDING;
      })
      .addCase(getRestaurant.rejected, (state, { meta }) => {
        state.requestStatusById[meta.arg] = REQUEST_STATUS.REJECTED;
      })
      .addCase(getRestaurant.fulfilled, (state, { payload }) => {
        entityAdapter.addOne(state, payload);
        state.requestStatusById[payload.id] = REQUEST_STATUS.FULFILLED;
      }),
});

export const { selectRequestStatus, selectRequestStatusById } =
  restaurantsSlice.selectors;

export const {
  selectById: selectRestaurantById,
  selectIds: selectRestaurantsIds,
} = entityAdapter.getSelectors((state) => state.restaurants);
