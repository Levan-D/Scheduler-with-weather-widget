/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const renameList = createAsyncThunk(
  "list/rename",
  async (payload, rejectWithValue) => {
    try {
      const body = payload.data;

      const res = await request("PATCH", `/lists/${payload.title}`, body, true);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

const renameListSlice = createSlice({
  name: "renameList",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.data = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    [renameList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [renameList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [renameList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetUser } = renameListSlice.actions;
export default renameListSlice.reducer;
