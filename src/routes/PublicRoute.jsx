import { Navigate } from "react-router-dom";

import { ROLES } from "@/constants/roles";
import { useAuthStore } from "@/features/auth/store/auth.store";

const PublicRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return children;
  }

  const redirectMap = {
    [ROLES.STUDENT]: "/student",
    [ROLES.INSTRUCTOR]: "/instructor",
    [ROLES.ADMIN]: "/admin",
  };

  return <Navigate to={redirectMap[user.role] ?? "/"} replace />;
};

export default PublicRoute;
