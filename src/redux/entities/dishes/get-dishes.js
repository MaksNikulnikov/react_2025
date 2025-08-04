import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDishes = createAsyncThunk(
  "dishes/getDishes",
  async (restaurantId, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3001/api/dishes?restaurantId=${restaurantId}`);
    if (!response.ok) {
      return rejectWithValue("Failed to fetch dishes");
    }

    const result = await response.json();
    return { restaurantId, dishes: result };
  },
  {
    condition: (restaurantId, { getState }) => {
      const state = getState();
      return !state.dishes.requestStatusByRestaurantId[restaurantId];
    },
  }
);
