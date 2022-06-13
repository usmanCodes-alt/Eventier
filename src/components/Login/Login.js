import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../../context/auth-context";

import useInput from "../../hooks/use-input";
import { validateEmail } from "../../utils/inputs-validators";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  let formIsValid = false;

  const {
    value: enteredEmail,
    isValid: emailValueIsValid,
    inputFieldHasError: emailInputFieldHasError,
    inputValueChangedHandler: emailChangedHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationError, setAuthenticationError] = useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);

  // check overall form validity
  if (emailValueIsValid) {
    // form will be valid only if email will be valid
    console.log("form is valid");
    formIsValid = true;
  } else {
    console.log("form is invalid");
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginButtonClicked = (e) => {
    if (!formIsValid || !password) {
      // if form is not valid or there is no value for the password, don't make the api call.
      setRequiredFieldsError(true);
      return;
    }

    axios
      .post("http://localhost:3000/eventier/login", {
        email: enteredEmail,
        password,
      })
      .then((response) => {
        setAuthenticationError(false);
        if (response.status !== 200) {
          return;
        }
        const user = {
          email: enteredEmail,
          roles: response.data.roles,
        };
        setUser(user);
        // console.log(response.data);
        let navigateUrl = "";
        if (response.data.roles[0] === "customer")
          navigateUrl = "/customer-home";
        else if (response.data.roles[0] === "service_provider")
          navigateUrl = "/service-provider/dashboard";

        console.log(navigateUrl);

        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("email", enteredEmail.trim());
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        navigate(navigateUrl);
      })
      .catch((error) => {
        console.log(error);
        setAuthenticationError(true);
      });
  };

  return (
    <div className="customerLogin__main-wrapper">
      <div className="customerLogin__back-arrow-container">
        <ArrowBackIcon
          className="customerLogin__back-arrow"
          onClick={() => navigate("/")}
        />
        <p className="customerLogin__go-back-text">(Go Back)</p>
      </div>
      <div className="customerLogin__container">
        <img
          className="customerLogin__logo"
          src={require("../../images/loginIllustration.svg").default}
          alt="logo"
        />

        <div className="customerLogin__form-container">
          <h3>Login to your account!</h3>
          <form>
            {authenticationError && (
              <div className="customerLogin__error-container">
                <div>Invalid username or password.</div>
              </div>
            )}
            {requiredFieldsError && (
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
          {/*<div className="customerLogin__other-options-container">
            <Link className="customerLogin__signup" to="/customer-signup">
              Create a new Customer Account{" "}
            </Link>
            <span className="customerLogin__signup">|</span>
            <Link
              to="/service-provider/sign-up"
              className="customerLogin__login-as-sp"
            >
              Create a New Service Provider Account{" "}
            </Link>
              </div>*/}
          <div className="customerLogin__other-options-container">
            <Link
              to="/start-password-reset"
              className="customerLogin__login-as-sp"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
