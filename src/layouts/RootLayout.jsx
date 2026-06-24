import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "../api/endpoints";
import axiosInstance from "../api/axiosInstance";
import ErrorBoundary from "../components/ErrorBoundary2";
import {
  setUser,
  setToken,
  clearAuth,
  setAuthChecked,
} from "../features/auth/authSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .post(API_ENDPOINTS.REFRESH_TOKEN)
      .then(({ data }) => {
        dispatch(setToken(data.accessToken));
        dispatch(setUser(data.user));
      })
      .catch(() => {
        dispatch(clearAuth());
      })
      .finally(() => {
        dispatch(setAuthChecked());
      });
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};

export default RootLayout;
