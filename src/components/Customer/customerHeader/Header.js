import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../../../logo.png";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    // navigate("/customer-login");
  };

  return (
    <div className="customer-header__container">
      <Link className="customer-header__logo-link" to="/customer-home">
        <img className="customer-header__logo" src={logo} alt="logo" />
      </Link>
      <nav>
        <ul className="customer-header__nav-links">
          <li>
            <NavLink className="customer-header__link" to="/customer-orders">
              Orders
            </NavLink>
          </li>
          <NavLink className="customer-header__link" to="/chat">
            Messages
          </NavLink>
          <NavLink
            to="/customer-login"
            className="customer-header__link"
            onClick={logout}
          >
            Logout
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

// TODO:
// Customers Orders
// Customer place new order
