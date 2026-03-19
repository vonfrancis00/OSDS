import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"; // ✅ added

import Dashboard from "./pages/Dashboard";
import Scholars from "./pages/Scholars";
import ScholarDetails from "./pages/ScholarDetails";
import Reports from "./pages/Reports";
import MSRS from "./pages/MSRS";
import SIKAP from "./pages/SIKAP";
import HUSAY from "./pages/HUSAY";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement"; // ✅ added

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { isAuthenticated } from "./utils/auth";

function App() {
  const [user, setUser] = useState(null); // ✅ added

  useEffect(() => { // ✅ added
    if (isAuthenticated()) {
      fetch("http://localhost:5000/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(res => res.json())
        .then(setUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
        } />

        <Route path="/login" element={
          <PublicRoute><Auth /></PublicRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute user={user}><Dashboard /></ProtectedRoute>
        } />

        <Route path="/scholars" element={
          <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
            <Scholars />
          </ProtectedRoute>
        } />

        <Route path="/scholars/:id" element={
          <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
            <ScholarDetails />
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
            <Reports />
          </ProtectedRoute>
        } />

        <Route path="/msrs" element={
          <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
            <MSRS />
          </ProtectedRoute>
        } />

        <Route path="/sikap" element={
          <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
            <SIKAP />
          </ProtectedRoute>
        } />

        <Route path="/husay" element={
          <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
            <HUSAY />
          </ProtectedRoute>
        } />

        {/* 👑 superadmin only */}
        <Route path="/users" element={
          <ProtectedRoute user={user} allowedRoles={["superadmin"]}>
            <UserManagement />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute user={user}><Settings /></ProtectedRoute>
        } />

        <Route path="*" element={
          <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;