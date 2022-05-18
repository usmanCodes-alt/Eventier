import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
        if (response.data.roles[0] !== "customer") {
          throw new Error("Invalid login");
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
        console.log(error);
        setAuthenticationError(true);
      });
  };

  return (
    <div className="customerLogin__container">
      <img className="customerLogin__logo" src={logo} alt="logo" />
      <div className="customerLogin__form-container">
        <h3>Explore different businesses around you!</h3>
        <form>
          {authenticationError && (
            <div className="customerLogin__error-container">
              <div>Invalid username or password.</div>
            </div>
          )}
          <div className="customerLogin__input-container">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={onEmailChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="customerLogin__input-container">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>
        </form>

        <div className="customerLogin__buttons-container">
          <Button variant="contained" onClick={onLoginButtonClicked}>
            Login
          </Button>
        </div>
        <div className="customerLogin__other-options-container">
          <Link className="customerLogin__signup" to="/customer-signup">
            Create a New Account
          </Link>{" "}
          |{" "}
          <Link
            to="/service-provider-login"
            className="customerLogin__login-as-sp"
          >
            Login as a Business
          </Link>
        </div>
      </div>
    </div>
  );
}
