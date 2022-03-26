import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import logo from "../../../logo.png";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationError, setAuthenticationError] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginButtonClicked = (e) => {
    if (!email || !password) {
      return;
    }

    axios
      .post("http://localhost:3000/eventier/login", {
        email,
        password,
      })
      .then((response) => {
        setAuthenticationError(false);
        if (response.status !== 200) {
          return;
        }
        const user = {
          email,
          roles: response.data.roles,
        };
        setUser(user);
        console.log(response.data);
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("email", email.trim());
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        navigate("/customer-home");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthenticationError(true);
        }
      });
  };

  const redirectToCustomerRegister = (e) => {
    navigate("/customer-signup");
  };

  return (
    <div className="customerLogin__container">
      <img className="customerLogin__logo" src={logo} alt="logo" />
      <div className="customerLogin__form-container">
        <form>
          {authenticationError && (
            <div className="customerLogin__error-container">
              <div>Invalid username or password.</div>
            </div>
          )}
          <div className="customerLogin__input-container">
            <label className="label" htmlFor="customer-email">
              Email
            </label>
            <input
              className="customerLogin__input-field"
              id="customer-email"
              type="email"
              value={email}
              onChange={onEmailChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="customerLogin__input-container">
            <label className="label" htmlFor="customer-password">
              Password
            </label>
            <input
              className="customerLogin__input-field"
              id="customer-password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>
        </form>

        <div className="customerLogin__buttons-container">
          <button className="customerLogin__btn" onClick={onLoginButtonClicked}>
            Login
          </button>
          <button
            className="customerLogin__btn"
            onClick={redirectToCustomerRegister}
          >
            Register
          </button>
        </div>

        <Link to="/" className="customerLogin__login-as-sp">
          Login as a Business
        </Link>
      </div>
    </div>
  );
}
