import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Protected({ children }) {
  const navigate = useNavigate();
  const [validJwt, setValidJwt] = useState(false);
  const authToken = localStorage.getItem("auth_token");

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  console.log("Running validate JWT!");
  axios
    .get(`http://localhost:3000/validate-jwt?`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      console.log("valid jwt");
      setValidJwt(true);
    })
    .catch((err) => {
      console.log("invalid jwt");
      console.log(err);
      localStorage.clear();
      if (err.response.status === 401) {
        navigate("/");
      }
    });

  if (validJwt) {
    return children;
  } else {
    return <React.Fragment></React.Fragment>;
  }
}
