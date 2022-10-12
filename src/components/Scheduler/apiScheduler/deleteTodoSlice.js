/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (payload, rejectWithValue) => {
    try {
      const body = null;

      const res = await request(
        "DELETE",
        `/lists/${payload.listId}/tasks/${payload.todoId}`,
        body,
        true
      );

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

const deleteTodoSlice = createSlice({
  name: "deleteTodo",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: {
    [deleteTodo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [deleteTodo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default deleteTodoSlice.reducer;
