import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import queryString from "query-string";
import { validatePassword } from "../../utils/inputs-validators";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import "./reset-password.css";

export default function ResetPassword() {
  let formIsValid = false;

  const navigate = useNavigate();
  const data = queryString.parse(window.location.search);

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [modelHeader, setModelHeader] = useState("");
  const [modalText, setModalText] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState();
  const {
    value: enteredPassword,
    isValid: passwordValueIsValid,
    inputFieldHasError: passwordInputFieldHasError,
    inputValueChangedHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  if (passwordValueIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const onResetPasswordButtonClicked = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    axios
      .patch("http://localhost:3000/reset-password", {
        otp,
        newPassword: enteredPassword,
        confirmNewPassword,
        eventierUserEmail: data.mail,
      })
      .then((res) => {
        setShowResponseModal(true);
        if (res.status === 200) {
          setModelHeader("Password Changed!");
          setModalText(
            "Your password has been changed successfully, please login again."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setShowResponseModal(true);
          setModelHeader("Error!");
          setModalText(err.response.data.message);
        }
      });
  };

  const handleResponseModalClose = (e) => {
    return navigate("/");
  };

  return (
    <React.Fragment>
      <Dialog
        open={showResponseModal}
        onClose={handleResponseModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modelHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResponseModalClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <div className="eventier__reset-form-container">
        <h1>Reset password.</h1>
        <div className="eventier__reset-password-form-wrapper">
          <div className="customerLogin__input-container">
            <TextField
              id="outlined-basic"
              label="OTP"
              variant="outlined"
              type="number"
              value={otp}
              onChange={(e) => setOtp(Number(e.target.value))}
              required
            />
          </div>
          <div className="customerLogin__input-container">
            {passwordInputFieldHasError && (
              <div className="inputField__error-message-wrapper">
                <span className="inputField__error-message-span">
                  Password must be at least 8 characters long, contain one lower
                  case, one upper case and one special character.
                </span>
              </div>
            )}
            <TextField
              id="outlined-basic"
              label="New Password"
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
              label="Confirm New Password"
              variant="outlined"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <Button
          className="eventier__reset-password-btn"
          variant="contained"
          onClick={onResetPasswordButtonClicked}
        >
          Reset Password
        </Button>
      </div>
    </React.Fragment>
  );
}
