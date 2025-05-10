import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admins redirected to dashboard when trying to access customer-only pages
  if (user.role === 'admin' && location.pathname.startsWith('/favorites')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Customers restricted from admin pages
  if (user.role === 'customer' && location.pathname.startsWith('/admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
}
