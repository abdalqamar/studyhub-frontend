import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "../constants/roles";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    if (user.role === ROLES.STUDENT) return <Navigate to="/student" replace />;
    if (user.role === ROLES.INSTRUCTOR)
      return <Navigate to="/instructor" replace />;
    if (user.role === ROLES.ADMIN) return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoute;
