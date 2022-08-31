import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface IAuthState {
  isAuth: boolean,
  isLoading: boolean,
  isCheckLoader: boolean,
  error: boolean,
}

const authState: IAuthState = {
  isAuth: false,
  isLoading: false,
  isCheckLoader: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string, password: string }>) => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.isAuth = true;
      state.isLoading = false;
    },
    loginError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      Cookies.remove(process.env["REACT_APP_NAME"] || "kjnkjdnvkjdnfbfgnb.fkngb5161113532fgnkbnfgkbnfgkjnbf.gknbkfgnbkngfkb56461135845");
      state.isAuth = false;
    },
    checkAuth: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    checkAuthSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.accessToken);
      state.isLoading = false;
      state.isAuth = true;
    },
    checkAuthError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginError,
  logout,
  checkAuth,
  checkAuthSuccess,
  checkAuthError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
