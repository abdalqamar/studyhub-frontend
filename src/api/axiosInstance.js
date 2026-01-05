import axios from "axios";
import { clearAuth, setToken, setUser } from "../features/auth/authSlice";
import { errorToast } from "../utils/toastUtils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;

let store;
export const injectStore = (_store) => {
  store = _store;
};

let refreshTokenPromise = null;
let isLoggingOut = false;

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
    /* basic network error */
    if (!error.response) {
      errorToast("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;
    const url = originalRequest.url;

    if (
      url.includes("/auth/refresh-token") &&
      (status === 401 || status === 403)
    ) {
      refreshTokenPromise = null;
      const hasAccessToken = !!store.getState().auth.accessToken;
      if (hasAccessToken && !isLoggingOut) {
        // toast only if still logged-in
        isLoggingOut = true;
        errorToast("Session expired. Please login again.");
        store.dispatch(clearAuth());
      }
      return Promise.reject(error);
    }

    // public route – no refresh
    if (PUBLIC_ROUTES.some((route) => url.includes(route))) {
      return Promise.reject(error);
    }

    // other 401 – refresh once
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
            const hasAccessToken = !!store.getState().auth.accessToken;
            if (hasAccessToken && !isLoggingOut) {
              // toast only if token exists
              isLoggingOut = true;
              errorToast("Session expired. Please login again.");
            }
            store.dispatch(clearAuth());
            throw refreshError;
          } finally {
            refreshTokenPromise = null;
          }
        })();
      }

      // wait for refresh, retry original call
      try {
        const newToken = await refreshTokenPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export default axiosInstance;

// let store;
// export const injectStore = (_store) => {
//   store = _store;
// };

// let refreshTokenPromise = null;
// let isLoggingOut = false;

// const PUBLIC_ROUTES = [
//   "/auth/login",
//   "/auth/register",
//   "/auth/forgot-password",
//   "/auth/reset-password",
//   "/auth/verify-otp",

// ];

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (res) => res,

//   async (error) => {
//     if (!error.response) {
//       toast.error("Network error. Please check your connection.");
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;
//     const status = error.response?.status;
//     const url = originalRequest?.url;

//     if (
//       url.includes("/auth/refresh-token") &&
//       (status === 401 || status === 403)
//     ) {
//       refreshTokenPromise = null;

//       const hasAccessToken = !!store.getState().auth.accessToken;

//       if (hasAccessToken && !isLoggingOut) {
//         isLoggingOut = true;
//         toast.error("Session expired. Please login again.");
//       }

//       store.dispatch(clearAuth());
//       isLoggingOut = false;

//       return Promise.reject(error);
//     }

//     if (PUBLIC_ROUTES.some((route) => url.includes(route))) {
//       return Promise.reject(error);
//     }

//     if (status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (refreshTokenPromise) {
//         try {
//           const newToken = await refreshTokenPromise;
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }

//       // Start a new token refresh
//       refreshTokenPromise = (async () => {
//         try {
//           const { data } = await axiosInstance.post("/auth/refresh-token");

//           const newToken = data.accessToken;
//           const user = data.user;

//           // Update Redux store
//           store.dispatch(setToken(newToken));
//           if (user) store.dispatch(setUser(user));

//           return newToken;
//         } catch (refreshError) {
//           if (!isLoggingOut) {
//             isLoggingOut = true;
//             store.dispatch(clearAuth());
//             isLoggingOut = false;
//           }
//           throw refreshError;
//         } finally {
//           refreshTokenPromise = null;
//         }
//       })();

//       try {
//         const newToken = await refreshTokenPromise;
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
