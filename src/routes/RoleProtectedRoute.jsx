import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

// const RoleProtectedRoute = ({ children, allowedRoles }) => {
//   const { isInitializing, isAuthenticated, user } = useSelector(
//     (state) => state.auth
//   );

//   if (isInitializing) return <LoadingSpinner />;

//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   if (!allowedRoles.includes(user.role))
//     return <Navigate to="/unauthorized" replace />;

//   return children;
// };

// export default RoleProtectedRoute;

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { accessToken, user } = useSelector((state) => state.auth);

  // Not logged in
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
