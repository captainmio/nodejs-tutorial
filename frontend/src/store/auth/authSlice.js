import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const localStorageUserToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userInfo,
  userToken: localStorageUserToken,
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

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/users/login`,
        { email, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: data.name,
          email: data.email,
          id: data.id,
        })
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userInfo");
});

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
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [userLogout.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogout.fulfilled]: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
    [userLogout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
