import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi, verifyUserLoginApi } from "../service/apiCollections";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  userDetails: null,
  userId: null,
};

// thunk middlewares

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (payload) => {
    try {
      const response = await loginUserApi(payload);
      return response;
    } catch (error) {
      return error;
    }
  },
);

export const verifyUserLoginAsync = createAsyncThunk(
  "user/verify",
  async () => {
    try {
      const response = await verifyUserLoginApi();
      return response;
    } catch (error) {
      return error;
    }
  },
);

// thunk middlewares

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userDetails = action?.payload?.data;
        state.userId = action.payload?.data?.id;
      })
      .addCase(verifyUserLoginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUserLoginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload.loginStatus;
        state.userDetails = action.payload.data;
      });
  },
});

export default UserSlice.reducer;
