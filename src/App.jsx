import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Scholars from "./pages/Scholars";
import ScholarDetails from "./pages/ScholarDetails";
import Reports from "./pages/Reports";
import MSRS from "./pages/MSRS";
import SIKAP from "./pages/SIKAP";
import HUSAY from "./pages/HUSAY";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { isAuthenticated } from "./utils/auth";

function App() {
  const [user, setUser] = useState(() => {
    // ✅ LOAD FROM LOCALSTORAGE FIRST (IMPORTANT FIX)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (isAuthenticated()) {
      fetch("http://localhost:5000/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // ✅ KEEP SYNCED
        })
        .catch(() => {
          // ❌ token invalid → logout
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* SCHOLARS */}
        <Route
          path="/scholars"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
              <Scholars />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scholars/:id"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
              <ScholarDetails />
            </ProtectedRoute>
          }
        />

        {/* REPORTS */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* PROGRAMS */}
        <Route
          path="/msrs"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
              <MSRS />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sikap"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
              <SIKAP />
            </ProtectedRoute>
          }
        />

        <Route
          path="/husay"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin", "superadmin"]}>
              <HUSAY />
            </ProtectedRoute>
          }
        />

        {/* 👑 SUPERADMIN ONLY */}
        <Route
          path="/users"
          element={
            <ProtectedRoute user={user} allowedRoles={["superadmin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;