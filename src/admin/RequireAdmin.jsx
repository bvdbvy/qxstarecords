import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RequireAdmin({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/auth" replace />;
  }

  return children;
}
