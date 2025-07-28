import { createSlice } from "@reduxjs/toolkit";
import { normalizedDishes } from "../../../assets/normalized-mock";

const initialState = {
  ids: normalizedDishes.map(({ id }) => id),
  entities: normalizedDishes.reduce((acc, dish) => {
    acc[dish.id] = dish;

    return acc;
  }, {}),
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  selectors: {
    selectDishById: (state, id) => state.entities[id],
    selectMultipleDishesById: (state, ids) => {
      return ids.map((id) => state.entities[id]);
    },
    selectDishesIds: (state) => state.ids,
  },
});

export const { selectDishById, selectDishesIds, selectMultipleDishesById } =
  dishesSlice.selectors;
