import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/inputs-validators";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import "./email-input.css";

export default function EmailInput() {
  const navigate = useNavigate();
  const [showMailSentAlert, setShowMailSentAlert] = useState(false);
  const [emailNotFoundHeader, setEmailNotFoundHeader] = useState("");
  const [emailNotFoundBodyText, setEmailNotFoundBodyText] = useState("");
  const [emailNotFound, setEmailNotFound] = useState(false);

  const {
    value: enteredEmail,
    isValid: emailValueIsValid,
    inputFieldHasError: emailInputFieldHasError,
    inputValueChangedHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const onSubmitEmailButtonClicked = (e) => {
    e.preventDefault();

    if (!emailValueIsValid) {
      return;
    }

    axios
      .post("http://localhost:3000/trigger-reset-password", {
        eventierUserEmail: enteredEmail,
      })
      .then((res) => {
        console.log(res);
        setShowMailSentAlert(true);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("404");
          setEmailNotFound(true);
          setShowMailSentAlert(true);
          setEmailNotFoundHeader("Email not found!");
          setEmailNotFoundBodyText(
            "No account was found associated with this email."
          );
        }
      });
  };

  const handleMailSentAlertClosed = (e) => {
    setShowMailSentAlert(false);
    if (!emailNotFound) {
      navigate("/");
    }
    setEmailNotFoundHeader("");
    setEmailNotFoundBodyText("");
    setEmailNotFound(false);
  };

  return (
    <div className="eventier__reset-form-container">
      <Dialog
        open={showMailSentAlert}
        onClose={handleMailSentAlertClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {emailNotFoundHeader ? emailNotFoundHeader : "Mail Acknowledged!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {emailNotFoundBodyText
              ? emailNotFoundBodyText
              : `We have received your email and will send you a password recovery
            mail on this email. Please do check your email, this might take some
            time.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMailSentAlertClosed} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <h5>Enter Email associated with this account.</h5>

      <div className="eventier__reset-password-form-wrapper">
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
            required
          />
        </div>
      </div>
      <Button
        className="eventier__submit-email-btn"
        variant="contained"
        onClick={onSubmitEmailButtonClicked}
      >
        Submit
      </Button>
    </div>
  );
}
