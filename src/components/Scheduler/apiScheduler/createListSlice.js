/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../../app/api/Request"

export const createList = createAsyncThunk(
  "list/create",
  async (title, rejectWithValue) => {
    try {
      const body = title

      const res = await request("POST", "/lists", body, true)

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

const createListSlice = createSlice({
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
    [createList.pending]: state => {
      state.loading = true
      state.error = null
    },
    [createList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload

      state.success = true
    },
    [createList.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default createListSlice.reducer
