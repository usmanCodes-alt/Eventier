import React from "react";
import { NavLink, Link } from "react-router-dom";

import { default as CustomerHeader } from "../../Customer/customerHeader/Header";
import { default as ServiceProviderHeader } from "../../ServiceProvider/Header/Header";

import logo from "../../../images/logo.png";

export default function Header() {
  if (localStorage.getItem("auth_token")) {
    // user is logged in.
    if (JSON.parse(localStorage.getItem("roles"))[0] === "customer") {
      return <CustomerHeader />;
    } else {
      return <ServiceProviderHeader />;
    }
  } else {
    return (
      <div className="customer-header__container">
        <div>
          <Link className="customer-header__logo-link" to="/">
            <img
              style={{ width: "10%" }}
              className="customer-header__logo"
              src={logo}
              alt="logo"
            />
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "header__active-link customer-header__link home-link"
                : "customer-header__link home-link"
            }
            to="/customer-signup"
          >
            New Customer
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "header__active-link customer-header__link home-link"
                : "customer-header__link home-link"
            }
            to="/service-provider/sign-up"
          >
            New Service Provider
          </NavLink>
        </div>
        <nav>
          <ul className="customer-header__nav-links">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "header__active-link customer-header__link"
                    : "customer-header__link"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
