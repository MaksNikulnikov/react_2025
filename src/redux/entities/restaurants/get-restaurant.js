import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectRestaurantById } from "./slice";

export const getRestaurant = createAsyncThunk(
  "restaurants/getRestaurant",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3001/api/restaurant/${id}`);

    if (!response.ok) {
      return rejectWithValue("Failed to fetch");
    }

    const result = await response.json();

    if (!result) {
      return rejectWithValue("No data");
    }

    return result;
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      const restaurant = selectRestaurantById(state, id);
      return !restaurant;
    },
  }
);
