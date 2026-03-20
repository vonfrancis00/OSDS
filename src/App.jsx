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
import API from "./api";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true); // 🔥 ADD THIS

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API}/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

        const data = await res.json();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false); // 🔥 IMPORTANT
      }
    };

    fetchUser();
  }, []);

  // 🔥 THIS FIXES YOUR PROBLEM
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

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

        {/* SUPERADMIN ONLY */}
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