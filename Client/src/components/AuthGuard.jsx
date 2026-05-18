import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const AuthGuard = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    // Redirect to login, but save the current location to come back later
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
