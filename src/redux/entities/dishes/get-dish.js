import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDish = createAsyncThunk(
  "dishes/getDish",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3001/api/dish/${id}`);
    if (!response.ok) {
      return rejectWithValue("Failed to fetch dishes");
    }

    const result = await response.json();
    return result;
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      return !state.dishes[id];
    },
  }
);
