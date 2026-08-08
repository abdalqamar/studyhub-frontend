import { User } from "@/types";
import { create } from "zustand";

interface SignupState {
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  signupState: SignupState | null;
  isInitializing: boolean;
  authChecked: boolean;
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string | null) => void;
  setSignupState: (signupState: SignupState) => void;
  resetSignupState: () => void;
  setInitializing: (value: boolean) => void;
  setAuthChecked: (value: boolean) => void;
  clearAuth: () => void;
  reset: () => void;
}

const initialState = {
  user: null,
  accessToken: null,
  signupState: null,

  isInitializing: true,
  authChecked: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,

  setUser: (user: User) =>
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
