import { create } from "zustand";

const initialState = {
  user: null,
  accessToken: null,
  signupState: null,

  isInitializing: true,
  authChecked: false,
};

export const useAuthStore = create((set) => ({
  ...initialState,

  setUser: (user) =>
    set({
      user,
    }),

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  setSignupState: (signupState) =>
    set({
      signupState,
    }),

  resetSignupState: () =>
    set({
      signupState: null,
    }),

  setInitializing: (value) =>
    set({
      isInitializing: value,
    }),

  setAuthChecked: (value) =>
    set({
      authChecked: value,
    }),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
    }),

  reset: () => set(initialState),
}));
