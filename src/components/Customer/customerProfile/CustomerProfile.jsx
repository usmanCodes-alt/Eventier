import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Header from "../customerHeader/Header";

import useInput from "../../../hooks/use-input";
import {
  validateFirstName,
  validateCountry,
} from "../../../utils/inputs-validators";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import avatar from "../../../images/profile_pic_avatar.png";

import "./CustomerProfile.css";

function CustomerProfile() {
  let formIsValid = false;
  const [customerInformation, setCustomerInformation] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const hiddenFileInput = useRef();

  const [formRequiredFieldsError, setFormRequiredFieldsError] = useState(false);

  const {
    value: enteredFirstName,
    isValid: firstNameValueIsValid,
    inputFieldHasError: firstNameInputFieldHasError,
    inputValueChangedHandler: firstNameChangeHandler,
    setInputValueForUpdate: setFirstNameValue,
    blurHandler: firstNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredLastName,
    isValid: lastNameValueIsValid,
    inputFieldHasError: lastNameInputFieldHasError,
    inputValueChangedHandler: lastNameChangeHandler,
    setInputValueForUpdate: setLastNameValue,
    blurHandler: lastNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredCountry,
    isValid: countryValueIsValid,
    inputFieldHasError: countryInputFieldHasError,
    inputValueChangedHandler: countryChangeHandler,
    setInputValueForUpdate: setCountryValue,
    blurHandler: countryBlurHandler,
  } = useInput(validateCountry);

  const {
    value: enteredCity,
    isValid: cityValueIsValid,
    inputFieldHasError: cityInputFieldHasError,
    inputValueChangedHandler: cityChangeHandler,
    setInputValueForUpdate: setCityValue,
    blurHandler: cityBlurHandler,
  } = useInput(validateCountry);

  const {
    value: enteredProvince,
    isValid: provinceValueIsValid,
    inputFieldHasError: provinceInputFieldHasError,
    inputValueChangedHandler: provinceChangeHandler,
    setInputValueForUpdate: setProvinceValue,
    blurHandler: provinceBlurHandler,
  } = useInput(validateCountry);

  const {
    value: enteredStreet,
    isValid: streetValueIsValid,
    inputFieldHasError: streetInputFieldHasError,
    inputValueChangedHandler: streetChangeHandler,
    setInputValueForUpdate: setStreetValue,
    blurHandler: streetBlurHandler,
  } = useInput(validateCountry);

  if (
    firstNameValueIsValid &&
    lastNameValueIsValid &&
    countryValueIsValid &&
    cityValueIsValid &&
    provinceValueIsValid &&
    streetValueIsValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const [showImageUploadSuccessAlert, setShowImageUploadSuccessAlert] =
    useState(false);
  const [showImageUploadFailureAlert, setShowImageUploadFailureAlert] =
    useState(false);

  const getDetails = () => {
    axios
      .get("http://localhost:3000/customers/get-details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        if (res.data.static_urls) {
          res.data.static_urls[0] =
            "http://localhost:3000/profile-pictures/" +
            localStorage.getItem("email") +
            "/" +
            res.data.static_urls[0];
        }
        console.log("customer information from API", res.data);
        setCustomerInformation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (!customerInformation) {
      return;
    }

    // new values
    setFirstNameValue(customerInformation.first_name);
    setLastNameValue(customerInformation.last_name);
    setCountryValue(customerInformation.country);
    setCityValue(customerInformation.city);
    setProvinceValue(customerInformation.province);
    setStreetValue(customerInformation.street);
  }, [customerInformation]);

  const updateProfile = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      setFormRequiredFieldsError(true);
      return;
    }

    axios
      .patch(
        "http://localhost:3000/customers/update-profile",
        {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          street: enteredStreet,
          city: enteredCity,
          country: enteredCountry,
          province: enteredProvince,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          getDetails();
          setUpdateMode(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProfilePictureUpload = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("eventierUserEmail", customerInformation.email);
    formData.append("cu-profile-picture", e.target.files[0]);
    axios
      .post("http://localhost:3000/customers/profile-picture/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const fileNameOnServer = res.data.filename;
          setCustomerInformation((oldCustomerInformation) => ({
            ...oldCustomerInformation,
            static_urls: [
              `http://localhost:3000/profile-pictures/${localStorage.getItem(
                "email"
              )}/${fileNameOnServer}`,
            ],
          }));
          setShowImageUploadSuccessAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowImageUploadFailureAlert(true);
      });
  };

  if (!customerInformation) {
    return <div>Please wait</div>;
  } else {
    return (
      <div className="profileDetail__wrapper">
        <Header />
        {showImageUploadSuccessAlert && (
          <Alert
            severity="success"
            onClose={() => setShowImageUploadSuccessAlert(false)}
          >
            Profile picture uploaded!
          </Alert>
        )}
        {showImageUploadFailureAlert && (
          <Alert
            severity="error"
            onClose={() => setShowImageUploadFailureAlert(false)}
          >
            Oops! There was some error uploading your profile picture, please
            try again later!
          </Alert>
        )}
        {formRequiredFieldsError && (
          <Alert
            severity="error"
            onClose={() => setFormRequiredFieldsError(false)}
          >
            <AlertTitle>Error</AlertTitle>
            Please provide <strong>all</strong> fields properly.
          </Alert>
        )}
        <div className="profileDetail__profile-picture-wrapper">
          <img
            className="profileDetail__picture"
            src={
              customerInformation.static_urls
                ? customerInformation.static_urls[0]
                : avatar
            }
            alt="Profile"
            onClick={() => hiddenFileInput.current.click()}
          />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            ref={hiddenFileInput}
            onChange={handleProfilePictureUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className="profileDetail__information-wrapper">
          <h3 className="profileDetail__information-heading">
            User Information
          </h3>
          <div className="profileDetail__information">
            <div className="sub-entry">
              {updateMode ? (
                <div className="profileDetail__input">
                  {firstNameInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Name can not be empty and only contain letters.
                      </span>
                    </div>
                  )}
                  <TextField
                    label="First Name"
                    value={enteredFirstName}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  First Name: {customerInformation.first_name}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  {lastNameInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Name can not be empty and only contain letters.
                      </span>
                    </div>
                  )}
                  <TextField
                    className="profileDetail__input"
                    label="Last Name"
                    value={enteredLastName}
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  Last Name: {customerInformation.last_name}
                </h5>
              )}
              {!updateMode && (
                <h5 className="profileDetail__info-heading">
                  Email: {customerInformation.email}
                </h5>
              )}
            </div>
            <div className="sub-entry">
              {updateMode ? (
                <div className="profileDetail__input">
                  {countryInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Country can not be empty and only contain letters.
                      </span>
                    </div>
                  )}
                  <TextField
                    className="profileDetail__input"
                    label="Country"
                    value={enteredCountry}
                    onChange={countryChangeHandler}
                    onBlur={countryBlurHandler}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  Country: {customerInformation.country}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  {cityInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        City can not be empty and only contain letters.
                      </span>
                    </div>
                  )}
                  <TextField
                    className="profileDetail__input"
                    label="City"
                    value={enteredCity}
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  City: {customerInformation.city}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  {provinceInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Province can not be empty and only contain letters.
                      </span>
                    </div>
                  )}
                  <TextField
                    className="profileDetail__input"
                    label="Province"
                    value={enteredProvince}
                    onChange={provinceChangeHandler}
                    onBlur={provinceBlurHandler}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  Province: {customerInformation.province}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  {streetInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Street can not be empty and only contain letters.
                      </span>
                    </div>
                  )}
                  <TextField
                    className="profileDetail__input"
                    label="Street"
                    value={enteredStreet}
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  Street: {customerInformation.street}
                </h5>
              )}
            </div>
          </div>
          <div className="profileDetail__button-container">
            {!updateMode && (
              <Button variant="contained" onClick={() => setUpdateMode(true)}>
                Edit
              </Button>
            )}
            {updateMode && (
              <React.Fragment>
                <Button
                  style={{ marginRight: "5px" }}
                  variant="contained"
                  onClick={updateProfile}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setUpdateMode(false)}
                >
                  Cancel
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProfile;
