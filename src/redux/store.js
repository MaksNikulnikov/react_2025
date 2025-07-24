import { configureStore } from "@reduxjs/toolkit";
import { dishesSlice } from "./entities/dishes/slice";
import { reviewsSlice } from "./entities/reviews/slice";
import { restaurantsSlice } from "./entities/restoraunts/slice";
import { usersSlice } from "./entities/users/slice";

export const store = configureStore({
  reducer: {
    [dishesSlice.name]: dishesSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [restaurantsSlice.name]: restaurantsSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
  },
});
