import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../app/api/Request";

export const forgotUser = createAsyncThunk(
  "forgot/fetchForgot",
  async ({ email }, { rejectWithValue }) => {
    try {
      const body = { email };
      const res = await request("POST", "/auth/forgot", body, false);
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

const userForgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [forgotUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [forgotUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [forgotUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { resetUser } = userForgotSlice.actions;
export default userForgotSlice.reducer;
