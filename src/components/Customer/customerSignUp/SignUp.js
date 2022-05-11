import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import Header from "../customerHeader/Header";

import logo from "../../../logo.png";
import "./signup.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFirstNameChanged = (e) => {
    setFirstName(e.target.value.trim());
  };

  const onLastNameChanged = (e) => {
    setLastName(e.target.value.trim());
  };

  const onPhoneNumberChanged = (e) => {
    setPhoneNumber(e.target.value.trim());
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value.trim());
  };

  const onRegisterClicked = (e) => {
    setRequiredFieldsError(false);
    setPasswordMatchError(false);
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setRequiredFieldsError(true);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    axios
      .post("http://localhost:3000/customers/create-new", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
      })
      .then((response) => {
        if (response.status !== 201) {
          return;
        }

        const user = {
          email,
          roles: response.data.roles,
        };
        // setUser(user);
        // console.log(response.data);
        // localStorage.setItem("auth_token", response.data.token);
        // localStorage.setItem("email", email.trim());
        // localStorage.setItem("roles", JSON.stringify(response.data.roles));

        // goto customer dashboard
        navigate("/");
        alert("Account created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redirectToCustomerLogin = (e) => {
    navigate("/");
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
            {passwordMatchError && (
              <div>
                <div className="customerLogin__error-container">
                  <div>Passwords don't match.</div>
                </div>
              </div>
            )}
            <div className="sub-entry">
              <div className="customerLogin__input-container">
                <label className="label" htmlFor="customer-first-name">
                  First Name
                </label>
                <input
                  className="customerLogin__input-field"
                  id="customer-first-name"
                  type="text"
                  value={firstName}
                  onChange={onFirstNameChanged}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <label className="label" htmlFor="customer-last-name">
                  Last Name
                </label>
                <input
                  className="customerLogin__input-field"
                  id="customer-last-name"
                  type="text"
                  value={lastName}
                  onChange={onLastNameChanged}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="customerLogin__input-container">
                <label className="label" htmlFor="customer-phone">
                  Phone Number
                </label>
                <input
                  className="customerLogin__input-field"
                  id="customer-phone"
                  type="number"
                  value={phoneNumber}
                  onChange={onPhoneNumberChanged}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="sub-entry">
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

              <div className="customerLogin__input-container">
                <label className="label" htmlFor="customer-confirm-password">
                  Password
                </label>
                <input
                  className="customerLogin__input-field"
                  id="customer-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                  required
                />
              </div>
            </div>
          </form>

          <div className="customerLogin__buttons-container">
            <button className="customerLogin__btn" onClick={onRegisterClicked}>
              Register
            </button>
            <button
              className="customerLogin__btn"
              onClick={redirectToCustomerLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
