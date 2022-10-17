/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../../app/api/Request"

export const loginUser = createAsyncThunk(
  "user/auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const body = { email, password }

      const res = await request("POST", "/auth/login", body, false)

      if (res.access_token !== "" && res.refresh_token !== "") {
        localStorage.setItem("accessToken", res.access_token)
        localStorage.setItem("refreshToken", res.refresh_token)
        return res
      } else {
        return rejectWithValue("tokens missing")
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState = {
  loading: false,
  acessToken: null,
  refreshToken: null,
  error: null,
  success: false,
}

const userLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetUser: state => {
      state.loading = false
      state.acessToken = null
      state.refreshToken = null
      state.success = false
      state.error = null
    },
  },
  extraReducers: {
    [loginUser.pending]: state => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false
      state.acessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
      state.success = true
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})
export const { resetUser } = userLoginSlice.actions
export default userLoginSlice.reducer
