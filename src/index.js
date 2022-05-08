import React from "react";
import ReactDOM from "react-dom";
// import { AuthContextProvider } from "./context/AuthContext";
import CartState from "./context/Cart/cartState";
import "./index.css";
import App from "./App";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

ReactDOM.render(
  <React.StrictMode>
    <CartState>
      <App />
    </CartState>
  </React.StrictMode>,
  document.getElementById("root")
);
