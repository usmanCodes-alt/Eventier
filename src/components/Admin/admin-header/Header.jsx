import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../../images/logo.png";

export default function Header() {
  return (
    <div className="customer-header__container">
      <div>
        <Link className="customer-header__logo-link" to="/admin/home">
          <img className="customer-header__logo" src={logo} alt="logo" />
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "header__active-link customer-header__link home-link"
              : "customer-header__link home-link"
          }
          to="/admin/home"
        >
          Block Service Provider
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "header__active-link customer-header__link home-link"
              : "customer-header__link home-link"
          }
          to="/admin/block/service"
        >
          Block Service
        </NavLink>
      </div>
    </div>
  );
}
