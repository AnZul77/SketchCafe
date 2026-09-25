import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const AuthGuard = ({ children }) => {
  const { user, authLoading } = useApp();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen flex items-center justify-center">
        <span className="font-script text-3xl text-vicolo-ochre animate-pulse">Reading passport...</span>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, but save the current location to come back later
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
