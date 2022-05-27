import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import CartContext from "../../../context/Cart/cartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "../../../images/logo.png";
import "./header.css";

export default function Header() {
  const { cartItems } = useContext(CartContext);

  const logout = () => {
    axios
      .delete("http://localhost:3000/customers/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="customer-header__container">
      <Link className="customer-header__logo-link" to="/customer-home">
        <img className="customer-header__logo" src={logo} alt="logo" />
      </Link>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "header__active-link customer-header__link home-link"
            : "customer-header__link home-link"
        }
        to="/customer-home"
      >
        Home
      </NavLink>
      <nav>
        <ul className="customer-header__nav-links">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header__active-link customer-header__link"
                  : "customer-header__link"
              }
              to="/customer/cart"
            >
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <div
                  className={({ isActive }) =>
                    isActive
                      ? "header__active-link customer-header__link customer-header__cart-items-count"
                      : "customer-header__link customer-header__cart-items-count"
                  }
                  style={{ display: "inline" }}
                >
                  <span>({cartItems.length})</span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header__active-link customer-header__link"
                  : "customer-header__link"
              }
              to="/customer/wish-list"
            >
              Wish List
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header__active-link customer-header__link"
                  : "customer-header__link"
              }
              to="/customer-orders"
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header__active-link customer-header__link"
                  : "customer-header__link"
              }
              to="/chat"
            >
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header__active-link customer-header__link"
                  : "customer-header__link"
              }
              to="/customer/profile"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="customer-header__link" onClick={logout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
