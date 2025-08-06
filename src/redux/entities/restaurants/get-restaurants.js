import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectRequestStatus, selectRestaurantsIds } from "./slice";
import { REQUEST_STATUS } from "../../constants";

export const getRestaurants = createAsyncThunk(
  "restaurants/getRestaurants",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:3001/api/restaurants/");

    const result = await response.json();

    if (!result.length) {
      rejectWithValue("Failed to fetch restaurants");
      return;
    }

    return result;
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const ids = selectRestaurantsIds(state);
      const currentStatus = selectRequestStatus(state)
      return ids.length === 0 || currentStatus !== REQUEST_STATUS.FULFILLED;
    },
  }
);
