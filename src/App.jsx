import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Scholars from "./pages/Scholars";
import ScholarDetails from "./pages/ScholarDetails";
import Reports from "./pages/Reports";
import MSRS from "./pages/MSRS";
import SIKAP from "./pages/SIKAP";
import HUSAY from "./pages/HUSAY";
import Auth from "./pages/Auth";

// 🔐 check login
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// 🔒 protected wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* auth */}
        <Route path="/login" element={<Auth />} />

        {/* protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/scholars" element={
          <ProtectedRoute><Scholars /></ProtectedRoute>
        } />

        <Route path="/scholars/:id" element={
          <ProtectedRoute><ScholarDetails /></ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute><Reports /></ProtectedRoute>
        } />

        <Route path="/msrs" element={
          <ProtectedRoute><MSRS /></ProtectedRoute>
        } />

        <Route path="/sikap" element={
          <ProtectedRoute><SIKAP /></ProtectedRoute>
        } />

        <Route path="/husay" element={
          <ProtectedRoute><HUSAY /></ProtectedRoute>
        } />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;