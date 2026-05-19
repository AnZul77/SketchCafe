import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const AdminGuard = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    // Optionally redirect to home or show unauthorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;
