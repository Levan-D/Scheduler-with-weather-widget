/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const getHealth = createAsyncThunk(
  "user/forgot",
  async (rejectWithValue) => {
    try {
      const body = null;

      const res = await request("GET", "/health", body, false);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  data: [],
  success: null,
};

const getHealthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [getHealth.pending]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.error = null;
    },
    [getHealth.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [getHealth.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { resetUser } = getHealthSlice.actions;
export default getHealthSlice.reducer;
