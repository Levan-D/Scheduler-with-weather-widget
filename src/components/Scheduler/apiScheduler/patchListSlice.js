/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const patchList = createAsyncThunk(
  "list/patch",
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

const patchListSlice = createSlice({
  name: "patchList",
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
    [patchList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [patchList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [patchList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetUser } = patchListSlice.actions;
export default patchListSlice.reducer;
