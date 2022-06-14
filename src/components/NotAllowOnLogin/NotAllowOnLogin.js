import React from "react";
import { Navigate } from "react-router-dom";

export default function NotAllowOnLogin({ children }) {
  const authToken = localStorage.getItem("auth_token");

  /**
   * if JWT is present, redirect to '/' else let go on login page
   */
  if (authToken) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}
