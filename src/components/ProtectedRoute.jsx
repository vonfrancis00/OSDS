import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;

  // 🔥 NORMALIZE ROLE (CRITICAL FIX)
  const role = user?.role
    ? user.role.toLowerCase().replace(/[\s_-]/g, "")
    : "";

  // 🔥 CHECK USING NORMALIZED ROLE
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;