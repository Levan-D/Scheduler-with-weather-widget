/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../app/api/Request";

export const getList = createAsyncThunk("list/get", async (rejectWithValue) => {
  try {
    const body = null;

    const res = await request("GET", "/lists", body, true);

    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

const getListSlice = createSlice({
  name: "getList",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.data = [];
      state.success = false;
      state.error = null;
    },
    pushNewList: (state, action) => {
      state.data.push(action.payload);
    },

    deleteListInter: (state, action) => {
      state.data.splice(action.payload, 1);
    },
    renameListInter: (state, action) => {
      state.data[action.payload.index].title = action.payload.data;
    },
    changeListColorInter: (state, action) => {
      state.data[action.payload.index].color = action.payload.data;
    },
    changeListDateInter: (state, action) => {
      state.data[action.payload.index].reminder_at = action.payload.data;
    },
  },
  extraReducers: {
    [getList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      state.success = true;
    },
    [getList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  resetUser,
  pushNewList,
  deleteListInter,
  renameListInter,
  changeListColorInter,
  changeListDateInter,
} = getListSlice.actions;
export default getListSlice.reducer;
