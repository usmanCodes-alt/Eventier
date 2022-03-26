import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <Link className="navbar-brand mt-2 mt-lg-0" to="/vendordashboard">
              <img src={logo} height="30" alt="MDB Logo" loading="lazy" />
            </Link>

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link" to="vendordashboard">
                  Home{" "}
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="totalOrders">
                  MyOrders{" "}
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="getAllServices">
                  Services{" "}
                </Link>
              </li>
            </ul>
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              width="70dp"
            />
          </div>

          <div class="d-flex align-items-center">
            <Link className="btn" to="profileDetail">
              My Profile
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
