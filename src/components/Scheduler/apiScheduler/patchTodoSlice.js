/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const patchTodo = createAsyncThunk(
  "list/patch",
  async (payload, rejectWithValue) => {
    try {
      const body = payload.data;

      const res = await request(
        "PATCH",
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
  data: [],
  error: null,
  success: false,
};

const patchTodoSlice = createSlice({
  name: "patchTodo",
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
    [patchTodo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [patchTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [patchTodo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetUser } = patchTodoSlice.actions;
export default patchTodoSlice.reducer;
