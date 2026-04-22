import { createSlice, createSelector } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addToCart: (state, { payload }) => {
      state[payload] = (state[payload] || 0) + 1;
    },
    removeFromCart: (state, { payload }) => {
      if (!state[payload]) {
        return state;
      }

      state[payload] = state[payload] - 1;

      if (state[payload] <= 0) {
        delete state[payload];
      }
    },
  },
  selectors: {
    selectAmountById: (state, id) => state[id],
  },
});

const selectCartSlice = (state) => state[cartSlice.name];

export const selectCartItemsIds = createSelector(
  [selectCartSlice],
  (cartSlice) => {
    return Object.keys(cartSlice);
  },
);

export const selectCartTotalAmount = createSelector(
  [selectCartSlice],
  (cartSlice) =>
    Object.values(cartSlice).reduce((total, amount) => total + amount, 0),
);

export const { selectAmountById } = cartSlice.selectors;
export const { addToCart, removeFromCart } = cartSlice.actions;
