import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../../context/auth-context.js";

import "./Footer.css";

export default function Footer() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  return (
    <footer>
      <div className="footer__content">
        <h3>Eventier</h3>
        <p>
          An E-Commerce store that brings Customers and Businesses together on
          one single platform.
        </p>
        {!user && (
          <Link to="/admin-login" className="footer__admin-login-text">
            Admin Login
          </Link>
        )}
      </div>
    </footer>
  );
}
