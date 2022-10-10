/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../../app/api/Request"

export const createTodo = createAsyncThunk(
  "todo/create",
  async (payload, rejectWithValue) => {
    try {
      const body = { description: payload.title }

      const res = await request("POST", `/lists/${payload.listId}/tasks`, body, true)

      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
}

const createTodoSlice = createSlice({
  name: "createList",
  initialState,
  reducers: {
    resetUser: state => {
      state.loading = false
      state.data = []
      state.success = false
      state.error = null
    },
  },
  extraReducers: {
    [createTodo.pending]: state => {
      state.loading = true
      state.error = null
    },
    [createTodo.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload

      state.success = true
    },
    [createTodo.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default createTodoSlice.reducer
