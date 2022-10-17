/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const rearrange = createAsyncThunk(
  "rearrange",
  async (payload, rejectWithValue) => {
    try {
      const body =
        payload.todoId.current === null
          ? { endpoint_id: payload.listId.replace }
          : { endpoint_id: payload.todoId.replace };
      const link =
        payload.todoId.current === null
          ? `/lists/${payload.listId.current}/position`
          : `/lists/${payload.listId.current}/tasks/${payload.todoId.current}/position`;
      const res = await request("PUT", link, body, true);

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

const rearrangeSlice = createSlice({
  name: "rearrange",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    [rearrange.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [rearrange.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [rearrange.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default rearrangeSlice.reducer;
