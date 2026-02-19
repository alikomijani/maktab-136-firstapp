import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../api/auth/model";
import { fakeLogin } from "../../api/auth/api";

interface AuthSlice {
  user: User | undefined;
  refreshToken: string | undefined;
  accessToken: string | undefined;
  isLogin: boolean;
  isLoading: boolean;
  error: string;
}
const initialState: AuthSlice = {
  user: undefined,
  refreshToken: undefined,
  accessToken: undefined,
  error: "",
  isLoading: false,
  isLogin: false,
};
export const fakeLoginAction = createAsyncThunk(
  "auth/login",
  async (params: { username: string; password: string }) => {
    try {
      const data = await fakeLogin(params);
      return data;
    } catch {
      throw new Error("invalid credential");
    }
  },
);
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = undefined;
      state.refreshToken = undefined;
      state.accessToken = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fakeLoginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fakeLoginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload.data.user;
        state.refreshToken = action.payload.data.refreshToken;
        state.accessToken = action.payload.data.accessToken;
        state.error = "";
      })
      .addCase(fakeLoginAction.rejected, (state) => {
        state.isLoading = false;
        state.error = "invalid credential";
      });
  },
});
export const { logout } = authReducer.actions;
export default authReducer.reducer;
