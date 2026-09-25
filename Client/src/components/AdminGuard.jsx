import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const AdminGuard = ({ children }) => {
  const { user, authLoading } = useApp();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen flex items-center justify-center">
        <span className="font-script text-3xl text-vicolo-ochre animate-pulse">Checking credentials...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;
