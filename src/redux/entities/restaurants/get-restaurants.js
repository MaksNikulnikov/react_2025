import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectRestaurantsIds } from "./slice";

export const getRestaurants = createAsyncThunk(
  "restaurants/getRestaurants",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:3001/api/restaurants/");

    const result = await response.json();

    if (!result.length) {
      rejectWithValue("no data");
      return;
    }

    return result;
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const ids = selectRestaurantsIds(state);
      return ids.length === 0;
    },
  }
);
