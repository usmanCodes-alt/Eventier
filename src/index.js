import React from "react";
import ReactDOM from "react-dom";
// import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

ReactDOM.render(
  <React.StrictMode>
    {/*<AuthContextProvider>*/}
    <App />
    {/*</AuthContextProvider>*/}
  </React.StrictMode>,
  document.getElementById("root")
);
