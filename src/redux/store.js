import { configureStore } from "@reduxjs/toolkit";
import { dishesSlice } from "./entities/dishes/slice";
import { reviewsSlice } from "./entities/reviews/slice";
import { restaurantsSlice } from "./entities/restaurants/slice";
import { usersSlice } from "./entities/users/slice";
import { cartSlice } from "./entities/cart/slice";

const loggerMiddleware = (store) => (next) => (action)=>{
  console.log('action', action, store)
  return next(action)
}

export const store = configureStore({
  reducer: {
    [dishesSlice.name]: dishesSlice.reducer,
    [reviewsSlice.name]: reviewsSlice.reducer,
    [restaurantsSlice.name]: restaurantsSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddlewares)=>getDefaultMiddlewares().concat(loggerMiddleware) 
});
