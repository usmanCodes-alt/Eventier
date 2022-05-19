import { useState, useContext } from "react";
import UserContext from "../../../context/auth-context";

import useInput from "../../../hooks/use-input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { validateEmail } from "../../../utils/inputs-validators";
import logo from "../../../logo.png";
import { useNavigate, Link } from "react-router-dom";

export default function SigninPage() {
  let formIsValid = false;
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationError, setAuthenticationError] = useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);

  const {
    value: enteredEmail,
    isValid: emailValueIsValid,
    inputFieldHasError: emailInputFieldHasError,
    inputValueChangedHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  if (emailValueIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginButtonClicked = (e) => {
    e.preventDefault();
    if (!formIsValid || !password) {
      setRequiredFieldsError(true);
      return;
    }
    axios
      .post("http://localhost:3000/eventier/login", {
        email: enteredEmail,
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
          email: enteredEmail.trim(),
          roles: res.data.roles,
        };
        setUser(loggedInUser);
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("email", enteredEmail.trim());
        localStorage.setItem("roles", JSON.stringify(res.data.roles));

        navigate("/service-provider/dashboard");
      })
      .catch((err) => {
        setAuthenticationError(true);
        console.log(err);
      });
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
          {requiredFieldsError && (
            <div className="customerLogin__error-container">
              <div>Please provide all required fields properly.</div>
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
              onChange={emailChangeHandler}
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
