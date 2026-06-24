import axios from "axios";
import { clearAuth, setToken, setUser } from "../features/auth/authSlice";
import { queryClient } from "../main.jsx";
import { errorToast } from "../utils/toastUtils.jsx";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000, // 5000 → 15000
});

export default axiosInstance;

// Upload ke liye alag instance
export const uploadAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 120000, // 2 minutes
});

let store;
export const injectStore = (_store) => {
  store = _store;
};

let refreshTokenPromise = null;

const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/send-otp",
];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res) => res,

  async (error) => {
    // Network error — no response
    if (!error.response) {
      errorToast("Network error — internet connection check karo");
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;
    const url = originalRequest.url;
    const message = error.response?.data?.message || "Something went wrong";

    // refresh-token endpoint fail — logout
    if (
      url.includes("/auth/refresh-token") &&
      (status === 401 || status === 403)
    ) {
      refreshTokenPromise = null;
      store.dispatch(clearAuth());
      queryClient.removeQueries({ queryKey: ["profile"] });
      return Promise.reject(error);
    }

    // public routes — khud handle karein
    if (PUBLIC_ROUTES.some((route) => url.includes(route))) {
      return Promise.reject(error);
    }

    // 401 — refresh try karo
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = (async () => {
          try {
            const { data } = await axiosInstance.post("/auth/refresh-token");
            const newToken = data.accessToken;
            const user = data.user;

            store.dispatch(setToken(newToken));
            if (user) store.dispatch(setUser(user));
            return newToken;
          } catch (refreshError) {
            store.dispatch(clearAuth());
            throw refreshError;
          } finally {
            refreshTokenPromise = null;
          }
        })();
      }

      try {
        const newToken = await refreshTokenPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    // 403 — access denied
    if (status === 403) {
      errorToast("Access denied");
      return Promise.reject(error);
    }

    // 404 — silently reject
    if (status === 404) {
      return Promise.reject(error);
    }

    // 429 — rate limited
    if (status === 429) {
      errorToast(message || "Too many requests — try again later");
      return Promise.reject(error);
    }

    // 500+ — server error
    if (status >= 500) {
      errorToast(message || "Server error — try again later");
      return Promise.reject(error);
    }

    // already handled by hook — skip toast
    if (error._handled) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
