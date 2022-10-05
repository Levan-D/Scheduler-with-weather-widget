import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../app/api/Request";

export const getList = createAsyncThunk(
  "list/fetchList",
  async (rejectWithValue) => {
    try {
      const res = await request("GET", "/lists", null, true);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  success: false,
  error: null,
};

const getListApi = createSlice({
  name: "listApi",
  initialState,
  reducers: {
    pushNewList: (state, action) => {
      state.data.push(action.payload);
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
export const { pushNewList } = getListApi.actions;
export default getListApi.reducer;
