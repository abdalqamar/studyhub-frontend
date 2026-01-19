import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    signupState: null,
    isInitializing: true,
    isAuthenticated: false,
    authChecked: false,
  },

  reducers: {
    setSignupState: (state, action) => {
      state.signupState = action.payload;
    },

    resetSignupState: (state) => {
      state.signupState = null;
    },

    setToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    finishLoading: (state) => {
      state.isInitializing = false;
    },

    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },
});
export const {
  setSignupState,
  resetSignupState,
  setToken,
  setUser,
  finishLoading,
  clearAuth,
  authChecked,
  setAuthChecked,
} = authSlice.actions;
export default authSlice.reducer;
