import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getDishes } from "./get-dishes";
import { REQUEST_STATUS } from "../../constants";
import { getDish } from "./get-dish";

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
  requestStatusByRestaurantId: {},
  requestStatusById: {},
});

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getDishes.pending, (state, { meta }) => {
        state.requestStatusByRestaurantId[meta.arg] = REQUEST_STATUS.PENDING;
      })
      .addCase(getDishes.rejected, (state, { meta }) => {
        state.requestStatusByRestaurantId[meta.arg] = REQUEST_STATUS.REJECTED;
      })
      .addCase(getDishes.fulfilled, (state, { payload }) => {
        entityAdapter.upsertMany(state, payload.dishes);
        state.requestStatusByRestaurantId[payload.restaurantId] =
          REQUEST_STATUS.FULFILLED;
      })
      .addCase(getDish.pending, (state, { meta }) => {
        state.requestStatusById[meta.arg] = REQUEST_STATUS.PENDING;
      })
      .addCase(getDish.rejected, (state, { meta }) => {
        state.requestStatusById[meta.arg] = REQUEST_STATUS.REJECTED;
      })
      .addCase(getDish.fulfilled, (state, { payload, meta }) => {
        entityAdapter.upsertOne(state, payload);
        state.requestStatusById[meta.arg] = REQUEST_STATUS.FULFILLED;
      }),
});

export const {
  selectById: selectDishById,
  selectIds: selectDishesIds,
  selectEntities,
  selectAll: selectAllDishes,
} = entityAdapter.getSelectors((state) => state.dishes);

export const selectMultipleDishesById = (state, ids) =>
  ids.map((id) => selectDishById(state, id));

export const selectDishesRequestStatus = (state, restaurantId) => {
  return (
    state.dishes.requestStatusByRestaurantId[restaurantId] ||
    REQUEST_STATUS.IDLE
  );
};

export const selectDishRequestStatus = (state, dishId) => {
  return state.dishes.requestStatusById[dishId] || REQUEST_STATUS.IDLE;
};
