import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  validateFirstName,
  validateStoreName,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validateCountry,
} from "../../../utils/inputs-validators";
import useInput from "../../../hooks/use-input";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import logo from "../../../images/logo.png";
import SignUpImage from "../../../images/signupImage.webp";

export default function Signup() {
  const navigate = useNavigate();
  let formIsValid = false;

  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    value: enteredFirstName,
    isValid: firstNameValueIsValid,
    inputFieldHasError: firstNameInputFieldHasError,
    inputValueChangedHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredLastName,
    isValid: lastNameValueIsValid,
    inputFieldHasError: lastNameInputFieldHasError,
    inputValueChangedHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredStoreName,
    isValid: storeNameValueIsValid,
    inputFieldHasError: storeNameInputFieldHasError,
    inputValueChangedHandler: storeNameChangeHandler,
    blurHandler: storeNameBlurHandler,
  } = useInput(validateStoreName);

  const {
    value: enteredPhoneNumber,
    isValid: phoneNumberValueIsValid,
    inputFieldHasError: phoneNumberInputFieldHasError,
    inputValueChangedHandler: phoneNumberChangeHandler,
    blurHandler: phoneNumberBlurHandler,
  } = useInput(validatePhoneNumber);

  const {
    value: enteredEmail,
    isValid: emailValueIsValid,
    inputFieldHasError: emailInputFieldHasError,
    inputValueChangedHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    isValid: passwordValueIsValid,
    inputFieldHasError: passwordInputFieldHasError,
    inputValueChangedHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  const {
    value: enteredStreet,
    isValid: streetValueIsValid,
    inputFieldHasError: streetInputFieldHasError,
    inputValueChangedHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
  } = useInput(validateCountry);

  const {
    value: enteredCity,
    isValid: cityValueIsValid,
    inputFieldHasError: cityInputFieldHasError,
    inputValueChangedHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
  } = useInput(validateCountry);

  const {
    value: enteredProvince,
    isValid: provinceValueIsValid,
    inputFieldHasError: provinceInputFieldHasError,
    inputValueChangedHandler: provinceChangeHandler,
    blurHandler: provinceBlurHandler,
  } = useInput(validateCountry);

  const {
    value: enteredCountry,
    isValid: countryValueIsValid,
    inputFieldHasError: countryInputFieldHasError,
    inputValueChangedHandler: countryChangeHandler,
    blurHandler: countryBlurHandler,
  } = useInput(validateCountry);

  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

  if (
    firstNameValueIsValid &&
    lastNameValueIsValid &&
    storeNameValueIsValid &&
    phoneNumberValueIsValid &&
    emailValueIsValid &&
    passwordValueIsValid &&
    streetValueIsValid &&
    cityValueIsValid &&
    provinceValueIsValid &&
    countryValueIsValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

  const onRegisterClicked = (e) => {
    e.preventDefault();
    if (enteredPassword !== confirmPassword) {
      setPasswordsNotMatch(true);
      return;
    }
    if (!formIsValid) {
      setRequiredFieldsError(true);
      return;
    }

    axios
      .post("http://localhost:3000/service-providers/create-new", {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        storeName: enteredStoreName,
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword,
        street: enteredStreet,
        city: enteredCity,
        province: enteredProvince,
        country: enteredCountry,
        phoneNumber: enteredPhoneNumber,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
        }
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
          <h3>Create a Business Account!</h3>
          <form>
            {requiredFieldsError && (
              <div>
                <div className="customerLogin__error-container">
                  <div>Please provide all fields.</div>
                </div>
              </div>
            )}
            {passwordsNotMatch && (
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
                  onChange={firstNameChangeHandler}
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
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                {storeNameInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Store Name can not be empty.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Store Name"
                  variant="outlined"
                  type="text"
                  value={enteredStoreName}
                  onChange={storeNameChangeHandler}
                  onBlur={storeNameBlurHandler}
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
                  onChange={emailChangeHandler}
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
                  onChange={passwordChangeHandler}
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
                  onChange={onConfirmPasswordChanged}
                  required
                />
              </div>
            </div>

            <div className="sub-entry">
              <div className="customerLogin__input-container">
                {phoneNumberInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Phone number must be valid.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  type="number"
                  value={enteredPhoneNumber}
                  onChange={phoneNumberChangeHandler}
                  onBlur={phoneNumberBlurHandler}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                {streetInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Street can not be empty and only contain letters.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Street"
                  variant="outlined"
                  type="text"
                  value={enteredStreet}
                  onChange={streetChangeHandler}
                  onBlur={streetBlurHandler}
                  required
                  placeholder="First Street"
                />
              </div>

              <div className="customerLogin__input-container">
                {cityInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      City can not be empty and only contain letters.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  type="text"
                  value={enteredCity}
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                  required
                />
              </div>
            </div>

            <div className="sub-entry">
              <div className="customerLogin__input-container">
                {countryInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Country can not be empty and only contain letters.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  type="text"
                  value={enteredCountry}
                  onChange={countryChangeHandler}
                  onBlur={countryBlurHandler}
                  required
                />
              </div>
              <div className="customerLogin__input-container">
                {provinceInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Province can not be empty and only contain letters.
                    </span>
                  </div>
                )}
                <TextField
                  id="outlined-basic"
                  label="Province"
                  variant="outlined"
                  type="text"
                  value={enteredProvince}
                  onChange={provinceChangeHandler}
                  onBlur={provinceBlurHandler}
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
