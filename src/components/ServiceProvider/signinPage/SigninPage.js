import { useState, useContext } from "react";
import UserContext from "../../../context/auth-context";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import logo from "../../../logo.png";
import { useNavigate, Link } from "react-router-dom";

export default function SigninPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationError, setAuthenticationError] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginButtonClicked = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    axios
      .post("http://localhost:3000/eventier/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status !== 200) {
          return; // Invalid email or password
        }
        if (res.data.roles[0] !== "service_provider") {
          throw new Error("Logged in for sp");
        }
        const loggedInUser = {
          email: email.trim(),
          roles: res.data.roles,
        };
        setUser(loggedInUser);
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("email", email.trim());
        localStorage.setItem("roles", JSON.stringify(res.data.roles));

        navigate("/service-provider/dashboard");
      })
      .catch((err) => {
        setAuthenticationError(true);
        console.log(err);
      });
  };

  const validate = (values) => {
    const errors = {};
    var validator = require("email-validator");
    if (!values.userEmail) {
      errors.email = "Email is required!";
    } else if (!validator.validate(values.userEmail)) {
      errors.email = "Email is not valid!";
    }

    if (!values.userPassword) {
      errors.password = "Password is required";
    }

    console.log(errors);

    return errors;
  };

  return (
    <div className="customerLogin__container">
      <img className="customerLogin__logo" src={logo} alt="logo" />
      <div className="customerLogin__form-container">
        <h3>Grow your business with us!</h3>
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
          <Link
            className="customerLogin__signup"
            to="/service-provider/sign-up"
          >
            Create a New Business Account
          </Link>{" "}
          |{" "}
          <Link to="/" className="customerLogin__login-as-sp">
            Login as a Customer
          </Link>
        </div>
      </div>
    </div>
  );
}
