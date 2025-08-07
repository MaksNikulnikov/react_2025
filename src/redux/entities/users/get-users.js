import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectUsersRequestStatus, selectUsersIds } from "./slice";
import { REQUEST_STATUS } from "../../constants";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    const response = await fetch("http://localhost:3001/api/users");
    if (!response.ok) {
      return rejectWithValue("Failed to fetch users");
    }

    const result = await response.json();
    return result;
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const ids = selectUsersIds(state);
      const currentStatus = selectUsersRequestStatus(state)
      return ids.length === 0 || currentStatus !== REQUEST_STATUS.FULFILLED;
    },
  }
);
