import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "./logo.png";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onStoreNameChanged = (e) => setStoreName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);
  const onStreetChanged = (e) => setStreet(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onProvinceChanged = (e) => setProvince(e.target.value);
  const onCountryChanged = (e) => setCountry(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);

  const onRegisterClicked = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !storeName ||
      !email ||
      !password ||
      !confirmPassword ||
      !street ||
      !city ||
      !province ||
      !country ||
      !phoneNumber
    ) {
      setRequiredFieldsError(true);
    }
    if (password !== confirmPassword) {
      setPasswordsNotMatch(true);
    }
    axios
      .post("http://localhost:3000/service-providers/create-new", {
        firstName,
        lastName,
        storeName,
        email,
        password,
        confirmPassword,
        street,
        city,
        province,
        country,
        phoneNumber,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/service-provider-login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="customerLogin__container">
        <img className="customerLogin__logo" src={logo} alt="logo" />
        <div className="customerLogin__form-container">
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
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  value={firstName}
                  onChange={onFirstNameChanged}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  value={lastName}
                  onChange={onLastNameChanged}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Store Name"
                  variant="outlined"
                  type="text"
                  value={storeName}
                  onChange={onStoreNameChanged}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  type="number"
                  value={phoneNumber}
                  onChange={onPhoneNumberChanged}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={onEmailChanged}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="sub-entry">
              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={onPasswordChanged}
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

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Street"
                  variant="outlined"
                  type="text"
                  value={street}
                  onChange={onStreetChanged}
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  type="text"
                  value={city}
                  onChange={onCityChanged}
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Country"
                  variant="outlined"
                  type="text"
                  value={country}
                  onChange={onCountryChanged}
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <TextField
                  id="outlined-basic"
                  label="Province"
                  variant="outlined"
                  type="text"
                  value={province}
                  onChange={onProvinceChanged}
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
            Already have an account?{" "}
            <Link to="/service-provider-login">Login</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
