import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isInitializing, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (isInitializing) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleProtectedRoute;
