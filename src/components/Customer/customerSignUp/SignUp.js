import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
                  label="Phone Number"
                  variant="outlined"
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
