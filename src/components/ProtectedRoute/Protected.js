import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Protected({ children }) {
  const [validJwt, setValidJwt] = useState(false);
  const authToken = localStorage.getItem("auth_token");
  console.log(authToken);

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  axios
    .get("http://localhost:3000/validate-jwt", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      setValidJwt(true);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        return <Navigate to="/" replace />;
      }
    });

  if (validJwt) {
    return children;
  } else {
    return <React.Fragment></React.Fragment>;
  }
}
