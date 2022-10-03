import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ email, first_name, last_name, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };
      // make request to backend
      await axios.post("http://todo.sns.ge/api/v1/auth/sign-up", {
        email,
        first_name,
        last_name,
        password,
      });
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserData: (state) => {
      console.log(`big butts`);
      state = {
        loading: false,
        userInfo: {},
        userToken: null,
        error: null,
        success: false,
      };
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;
