import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { accessToken, user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return null;
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
