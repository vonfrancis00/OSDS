import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children, user, allowedRoles }) => {
  // ❌ Not logged in
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ Wait for user to load (prevents flicker / bypass)
  if (!user) {
    return null; // or loading spinner
  }

  // 🔒 Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;