import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/endpoints";
import ErrorBoundary from "@/shared/components/ErrorBoundary";

const RootLayout = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await axiosInstance.post(
          API_ENDPOINTS.AUTH_REFRESH_TOKEN
        );

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
        }

        if (data?.user) {
          setUser(data.user);
        }
      } catch {
        clearAuth();
      } finally {
        setAuthChecked(true);
        setInitializing(false);
      }
    };

    initializeAuth();
  }, [setUser, setAccessToken, clearAuth, setAuthChecked, setInitializing]);

  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};

export default RootLayout;
