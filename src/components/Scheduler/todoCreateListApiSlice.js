import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../app/api/Request";

export const createList = createAsyncThunk(
  "list/createList",
  async ({ title }, { rejectWithValue }) => {
    const body = { title };
    try {
      const res = await request("POST", "/lists", body, true);

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

const createListApi = createSlice({
  name: "createListApi",
  initialState,
  reducers: {},
  extraReducers: {
    [createList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    [createList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { resetUser } = createListApi.actions;
export default createListApi.reducer;
