import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUS } from "../../constants";
import { getRestaurants } from "./get-restaurants";
import { getRestaurant } from "./get-restaurant";

const initialState = {
  ids: [],
  entities: {},
  requestRestaurantsStatus: REQUEST_STATUS.IDLE,
  requestStatusById: {},
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  selectors: {
    selectRestaurantById: (state, id) => state.entities[id],
    selectRestaurantsIds: (state) => state.ids,
    selectRequestStatus: (state) => state.requestRestaurantsStatus,
    selectRequestStatusById: (state, id) => state.requestStatusById[id]
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
        state.ids = payload.map(({ id }) => id);
        state.entities = payload.reduce((acc, restaurant) => {
          acc[restaurant.id] = restaurant;

          return acc;
        }, {});
      })
      .addCase(getRestaurant.pending, (state, { meta }) => {
        state.requestStatusById[meta.arg] = REQUEST_STATUS.PENDING;
      })
      .addCase(getRestaurant.rejected, (state, { meta }) => {
        state.requestStatusById[meta.arg] = REQUEST_STATUS.REJECTED;
      })
      .addCase(getRestaurant.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload;
        state.requestStatusById[payload.id] = REQUEST_STATUS.FULFILLED;
        if (!state.ids.includes(payload.id)) {
          state.ids.push(payload.id);
        }
      }),
});

export const {
  selectRestaurantById,
  selectRestaurantsIds,
  selectRequestStatus,
  selectRequestStatusById
} = restaurantsSlice.selectors;
