import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate } from "react-router-dom";
import PageLoader from "@/shared/ui/PageLoader";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const authChecked = useAuthStore((state) => state.authChecked);

  if (!authChecked) {
    return <PageLoader />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
