import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../app/api/Request";

export const signUpUser = createAsyncThunk(
  "user/register",
  async ({ email, first_name, last_name, password }, { rejectWithValue }) => {
    try {
      const body = { email, first_name, last_name, password };

      const res = await request("POST", "/auth/sign-up", body, false);

      if (res.access_token !== "" && res.refresh_token !== "") {
        localStorage.setItem("accessToken", res.access_token);
        localStorage.setItem("refreshToken", res.refresh_token);
        return res;
      } else {
        return rejectWithValue("tokens missing");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  userInfo: {},
  acessToken: null,
  refreshToken: null,
  error: null,
  success: false,
};

const userSignUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.userInfo = {};
      state.acessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.acessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.success = true;
    },
    [signUpUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { resetUser } = userSignUpSlice.actions;
export default userSignUpSlice.reducer;
