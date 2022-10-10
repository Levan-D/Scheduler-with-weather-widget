/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const deleteList = createAsyncThunk(
  "list/delete",
  async (title, rejectWithValue) => {
    try {
      const body = { id: title };

      const res = await request("DELETE", `/lists/${title}`, body, true);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const deleteListSlice = createSlice({
  name: "createList",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    [deleteList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [deleteList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default deleteListSlice.reducer;
