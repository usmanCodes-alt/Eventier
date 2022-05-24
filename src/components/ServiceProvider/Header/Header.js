import React from "react";
import logo from "./logo.png";
import { NavLink } from "react-router-dom";

import "./Header.css";
import axios from "axios";

export default function Header() {
  const logout = () => {
    axios
      .delete("http://localhost:3000/service-providers/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.clear();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sp__header-container">
      <div className="sp__header-left">
        <div className="sp__header-img-container">
          <NavLink to="/service-provider/dashboard">
            <img className="sp__header-logo" src={logo} alt="Eventier" />
          </NavLink>
        </div>

        <nav>
          <ul className="sp__header-ul">
            <NavLink
              className="sp__header-nav-link"
              to="/service-provider/total-orders"
            >
              <li className="sp__header-li">My Orders</li>
            </NavLink>
            <NavLink
              className="sp__header-nav-link"
              to="/service-provider/my-services"
            >
              <li className="sp__header-li">My Services</li>
            </NavLink>
            <NavLink
              className="sp__header-nav-link"
              to="/service-provider/add-service"
            >
              <li className="sp__header-li">Add Service</li>
            </NavLink>
            <NavLink className="sp__header-nav-link" to="/chat">
              <li className="sp__header-li">Messages</li>
            </NavLink>
          </ul>
        </nav>
      </div>

      <div className="sp__header-right">
        <nav>
          <ul className="sp__header-ul">
            <NavLink
              className="sp__header-nav-link"
              to="/service-provider/profile"
            >
              <li className="sp__header-li">Profile</li>
            </NavLink>

            <NavLink
              className="sp__header-nav-link"
              to="/service-provider-login"
              onClick={logout}
            >
              <li className="sp__header-li">Logout</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}
