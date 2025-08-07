import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./get-users";
import { REQUEST_STATUS } from "../../constants";

const entityAdapter = createEntityAdapter();
const initialState = entityAdapter.getInitialState({
  requestStatus: REQUEST_STATUS.IDLE,
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  selectors: {
    selectUsersRequestStatus: (state) => state.requestStatus,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.pending, (state) => {
        state.requestStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(getUsers.rejected, (state) => {
        state.requestStatus = REQUEST_STATUS.REJECTED;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        entityAdapter.upsertMany(state, payload);
        state.requestStatus = REQUEST_STATUS.FULFILLED;
      }),
});

export const {
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = entityAdapter.getSelectors((state) => state.users);

export const { selectUsersRequestStatus } = usersSlice.selectors;
