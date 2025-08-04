import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getDishes } from "./get-dishes";
import { REQUEST_STATUS } from "../../constants";

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
  requestStatusByRestaurantId: {},
});

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getDishes.pending, (state, { meta }) => {
        console.log('pending')
        state.requestStatusByRestaurantId[meta.arg] = REQUEST_STATUS.PENDING;
      })
      .addCase(getDishes.rejected, (state, { meta }) => {
        state.requestStatusByRestaurantId[meta.arg] = REQUEST_STATUS.REJECTED;
      })
      .addCase(getDishes.fulfilled, (state, { payload }) => {
        console.log('fulldiled::', payload)
        entityAdapter.upsertMany(state, payload.dishes);
        state.requestStatusByRestaurantId[payload.restaurantId] = REQUEST_STATUS.FULFILLED;
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
return   state.dishes.requestStatusByRestaurantId[restaurantId] || REQUEST_STATUS.IDLE;
}

