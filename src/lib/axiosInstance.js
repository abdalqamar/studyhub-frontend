import axios from "axios";
import { queryClient } from "@/app/queryClient";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { errorToast } from "@/shared/utils/toastUtils";
import { API_ENDPOINTS } from "./endpoints";
import { PUBLIC_ROUTES } from "@/constants/publicRoutes";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

export default axiosInstance;

let refreshTokenPromise = null;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
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
      errorToast("Please check your internet connection and try again");
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;
    const url = originalRequest?.url ?? "";

    // refresh-token endpoint fail — logout

    if (
      url.includes("/auth/refresh-token") &&
      (status === 401 || status === 403)
    ) {
      refreshTokenPromise = null;

      const code = error.response?.data?.code;
      const message = error.response?.data?.message;
      console.log("code", code, "message", message);
      if (code === "SESSION_EXPIRED") {
        errorToast("Session expired — please login again");
      } else if (status === 403) {
        errorToast(message);
      }
      useAuthStore.getState().clearAuth();
      queryClient.removeQueries({ queryKey: ["profile"] });
      return Promise.reject(error);
    }

    // public routes
    if (PUBLIC_ROUTES.some((route) => url.includes(route))) {
      return Promise.reject(error);
    }

    // 401 — refresh try karo
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = (async () => {
          try {
            const { data } = await axiosInstance.post(
              API_ENDPOINTS.AUTH_REFRESH_TOKEN
            );
            const newToken = data.accessToken;
            const user = data.user;

            useAuthStore.getState().setAccessToken(newToken);
            if (user) useAuthStore.getState().setUser(user);
            return newToken;
          } catch (refreshError) {
            useAuthStore.getState().clearAuth();
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
      errorToast("Too many requests — try again later");
      return Promise.reject(error);
    }

    // 500+ — server error
    if (status >= 500) {
      errorToast("Server error — try again later");
      return Promise.reject(error);
    }

    // already handled by hook — skip toast
    if (error._handled) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
