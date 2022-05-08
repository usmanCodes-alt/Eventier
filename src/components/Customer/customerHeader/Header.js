import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import CartContext from "../../../context/Cart/cartContext";

import logo from "../../../logo.png";
import "./header.css";

export default function Header() {
  const { cartItems } = useContext(CartContext);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="customer-header__container">
      <Link className="customer-header__logo-link" to="/customer-home">
        <img className="customer-header__logo" src={logo} alt="logo" />
      </Link>
      <nav>
        <ul className="customer-header__nav-links">
          <li>
            <NavLink className="customer-header__link" to="/customer/cart">
              Cart{" "}
              {cartItems.length > 0 && (
                <div className="customer-header__cart-items-count">
                  <span>({cartItems.length})</span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink className="customer-header__link" to="/customer-orders">
              Orders
            </NavLink>
          </li>
          <NavLink className="customer-header__link" to="/chat">
            Messages
          </NavLink>
          <NavLink to="/" className="customer-header__link" onClick={logout}>
            Logout
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}
