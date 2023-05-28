import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const backendURL = "http://localhost:5000/api";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      // check if password and confirmPassword are the same
      if (password !== confirmPassword) {
        return rejectWithValue("Password not match");
      }

      await axios.post(
        `${backendURL}/users/register`,
        { name, email, password },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
