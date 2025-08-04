import { createAsyncThunk } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (restaurantId, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3001/api/reviews?restaurantId=${restaurantId}`);
    if (!response.ok) {
      return rejectWithValue("Failed to fetch reviews");
    }

    const result = await response.json();
    return { restaurantId, reviews: result };
  },
  {
    condition: (restaurantId, { getState }) => {
      const state = getState();
      return !state.reviews.requestStatusByRestaurantId[restaurantId];
    },
  }
);
