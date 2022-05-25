import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  //   const navigate = useNavigate();
  const authToken = localStorage.getItem("auth_token");
  console.log(authToken);

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
