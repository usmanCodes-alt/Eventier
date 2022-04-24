import React from "react";
import { NavLink, Link } from "react-router-dom";

import logo from "../../../logo.png";
import "./header.css";

export default function Header() {
  return (
    <div className="customer-header__container">
      <Link className="customer-header__logo-link" to="/customer-home">
        <img className="customer-header__logo" src={logo} alt="logo" />
      </Link>
      <nav>
        <ul className="customer-header__nav-links">
          <li>
            <NavLink className="customer-header__link" to="#">
              Orders
            </NavLink>
          </li>
          <NavLink className="customer-header__link" to="/chat">
            Messages
          </NavLink>
          <NavLink to="#" className="customer-header__link">
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
