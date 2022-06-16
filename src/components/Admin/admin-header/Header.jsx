import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import logo from "../../../images/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="customer-header__container">
      <div>
        <Link className="customer-header__logo-link" to="/admin/block/sp">
          <img className="customer-header__logo" src={logo} alt="logo" />
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "header__active-link customer-header__link home-link"
              : "customer-header__link home-link"
          }
          to="/admin/block/sp"
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

      <nav>
        <ul className="customer-header__nav-links">
          <li className="customer-header__link link-style" onClick={logout}>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
}
