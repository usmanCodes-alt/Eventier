import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useInput from "../../../hooks/use-input";
import { validateEmail } from "../../../utils/inputs-validators";

import "./admin-login.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  let formIsValid = false;

  const {
    value: enteredEmail,
    isValid: emailValueIsValid,
    inputFieldHasError: emailInputFieldHasError,
    inputValueChangedHandler: emailChangedHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const [password, setPassword] = useState("");
  const [showRequiredFieldsAlert, setShowRequiredFieldsAlert] = useState(false);
  const [
    showInvalidUsernameOrPasswordError,
    setShowInvalidUsernameOrPasswordError,
  ] = useState(false);

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  if (emailValueIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const onLoginButtonClicked = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      setShowRequiredFieldsAlert(true);
    }

    axios
      .post("http://localhost:3000/eventier/admin/login-admin", {
        email: enteredEmail,
        password,
      })
      .then((res) => {
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("roles", JSON.stringify(res.data.role));

        navigate("/admin/block/sp");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setShowInvalidUsernameOrPasswordError(true);
        }
      });
  };

  return (
    <div className="admin-login__container">
      <div className="admin-login-form-wrapper">
        <h4>Admin Login</h4>
        {showInvalidUsernameOrPasswordError && (
          <div className="customerLogin__error-container">
            <div>Invalid email or password.</div>
          </div>
        )}
        {showRequiredFieldsAlert && (
          <div className="customerLogin__error-container">
            <div>Please provide all required fields.</div>
          </div>
        )}
        <div className="customerLogin__input-container">
          {emailInputFieldHasError && (
            <div className="inputField__error-message-wrapper">
              <span className="inputField__error-message-span">
                Invalid Email.
              </span>
            </div>
          )}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
        </div>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <Button variant="contained" onClick={onLoginButtonClicked}>
          Login
        </Button>
      </div>
    </div>
  );
}
