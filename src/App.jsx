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
import MainLayout from "./layout/MainLayout";

import { isAuthenticated } from "./utils/auth";
import API from "./utils/api";

function App() {
  const [loading, setLoading] = useState(true);

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

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));

      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scholars"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <Scholars />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scholars/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <ScholarDetails />
              </ProtectedRoute>
            }
          />

          {/* 🔥 MSRS */}
          <Route
            path="/msrs"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <MSRS />
              </ProtectedRoute>
            }
          />

          {/* 🔥 MSRS DETAILS */}
          <Route
            path="/msrs/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <ScholarDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sikap"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <SIKAP />
              </ProtectedRoute>
            }
          />

          <Route
            path="/husay"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <HUSAY />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

        </Route>

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