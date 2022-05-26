import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import UserContext from "../../../context/auth-context";

import {
  validateFirstName,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
} from "../../../utils/inputs-validators";
import useInput from "../../../hooks/use-input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SignUpImage from "../../../images/signupImage.webp";
import "./signup.css";

export default function SignUp() {
  let formIsValid = false;
  const navigate = useNavigate();
  // const { setUser } = useContext(UserContext);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    value: enteredFirstName,
    isValid: firstNameValueIsValid, // based on the function we pass
    inputFieldHasError: firstNameInputFieldHasError, // based on the touched state and value valid value
    inputValueChangedHandler: firstNameChangedHandler,
    blurHandler: firstNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredLastName,
    isValid: lastNameValueIsValid, // based on the function we pass
    inputFieldHasError: lastNameInputFieldHasError, // based on the touched state and value valid value
    inputValueChangedHandler: lastNameChangedHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredPhoneNumber,
    isValid: phoneNumberValueIsValid, // based on the function we pass
    inputFieldHasError: phoneNumberInputFieldHasError, // based on the touched state and value valid value
    inputValueChangedHandler: phoneNumberChangedHandler,
    blurHandler: phoneNumberBlurHandler,
  } = useInput(validatePhoneNumber);

  const {
    value: enteredEmail,
    isValid: emailValueIsValid, // based on the function we pass
    inputFieldHasError: emailInputFieldHasError, // based on the touched state and value valid value
    inputValueChangedHandler: emailChangedHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    isValid: passwordValueIsValid, // based on the function we pass
    inputFieldHasError: passwordInputFieldHasError, // based on the touched state and value valid value
    inputValueChangedHandler: passwordChangedHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  if (
    firstNameValueIsValid &&
    lastNameValueIsValid &&
    phoneNumberValueIsValid &&
    emailValueIsValid &&
    passwordValueIsValid
  ) {
    formIsValid = true;
  }

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value.trim());
  };

  const onRegisterClicked = (e) => {
    setRequiredFieldsError(false);
    setPasswordMatchError(false);
    if (!formIsValid || !confirmPassword) {
      setRequiredFieldsError(true);
      return;
    }
    if (enteredPassword !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    axios
      .post("http://localhost:3000/customers/create-new", {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword,
        phoneNumber: enteredPhoneNumber,
      })
      .then((response) => {
        if (response.status !== 201) {
          return;
        }

        // const user = {
        //   email,
        //   roles: response.data.roles,
        // };
        navigate("/");
        alert("Account created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="customerLogin__container">
        <img
          className="customerLogin__logo"
          src={SignUpImage}
          alt="logo"
          style={{ width: "30%" }}
        />
        <div className="customerLogin__form-container">
          <h3>Create a new Account.</h3>

          <form>
            {requiredFieldsError && (
              <div>
                <div className="customerLogin__error-container">
                  <div>Please provide all fields properly.</div>
                </div>
              </div>
            )}
            {passwordMatchError && (
              <div>
                <div className="customerLogin__error-container">
                  <div>Passwords don't match.</div>
                </div>
              </div>
            )}
            <div className="sub-entry">
              <div className="customerLogin__input-container">
                {firstNameInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Name can not be empty and only contain letters.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  value={enteredFirstName}
                  onChange={firstNameChangedHandler}
                  onBlur={firstNameBlurHandler}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                {lastNameInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Name can not be empty and only contain letters.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  value={enteredLastName}
                  onChange={lastNameChangedHandler}
                  onBlur={lastNameBlurHandler}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                {phoneNumberInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      In-valid phone number.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  type="number"
                  value={enteredPhoneNumber}
                  onChange={phoneNumberChangedHandler}
                  onBlur={phoneNumberBlurHandler}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="sub-entry">
              <div className="customerLogin__input-container">
                {emailInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Email should not be empty or contain any special
                      characters and should be in a correct format.
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
                {passwordInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Password must be at least 8 characters long, contain one
                      lower case, one upper case and one special character.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={enteredPassword}
                  onChange={passwordChangedHandler}
                  onBlur={passwordBlurHandler}
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                  required
                />
              </div>
            </div>
          </form>

          <div className="customerLogin__buttons-container">
            <Button variant="contained" onClick={onRegisterClicked}>
              Register
            </Button>
          </div>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
