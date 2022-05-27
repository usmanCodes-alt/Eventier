import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment,
} from "react";
import UserContext from "../../../context/auth-context";
import Header from "../Header/Header";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useInput from "../../../hooks/use-input";
import {
  validateFirstName,
  validatePhoneNumber,
  validateStoreName,
  validateStreet,
  validateCity,
  validateCountry,
  validateProvince,
} from "../../../utils/inputs-validators";

import profilePicturePlaceHolder from "../../../images/profile_pic_avatar.png";
import "./profile.css";

export default function Profile() {
  let formIsValid = false;
  const token = localStorage.getItem("auth_token");
  const { user, setUser } = useContext(UserContext);
  const profilePictureInputRef = useRef(null);
  const [userInformation, setUserInformation] = useState({});
  const [staticProfilePictureUrl, setStaticProfilePictureUrl] = useState(
    profilePicturePlaceHolder
  );
  const [updateMode, setUpdateMode] = useState(false);

  const {
    value: enteredFirstName,
    isValid: firstNameValueIsValid,
    inputFieldHasError: firstNameInputFieldHasError,
    inputValueChangedHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    setInputValueForUpdate: setFirstNameValue,
  } = useInput(validateFirstName);

  const {
    value: enteredLastName,
    isValid: lastNameValueIsValid,
    inputFieldHasError: lastNameInputFieldHasError,
    inputValueChangedHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    setInputValueForUpdate: setLastNameValue,
  } = useInput(validateFirstName);

  const {
    value: enteredPhoneNumber,
    isValid: phoneNumberValueIsValid,
    inputFieldHasError: phoneNumberInputFieldHasError,
    inputValueChangedHandler: phoneNumberChangeHandler,
    blurHandler: phoneNumberBlurHandler,
    setInputValueForUpdate: setPhoneNumberValue,
  } = useInput(validatePhoneNumber);

  const {
    value: enteredStoreName,
    isValid: storeNameValueIsValid,
    inputFieldHasError: storeNameInputFieldHasError,
    inputValueChangedHandler: storeNameChangeHandler,
    blurHandler: storeNameBlurHandler,
    setInputValueForUpdate: setStoreNameValue,
  } = useInput(validateStoreName);

  const {
    value: enteredStreet,
    isValid: streetValueIsValid,
    inputFieldHasError: streetInputFieldHasError,
    inputValueChangedHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    setInputValueForUpdate: setStreetValue,
  } = useInput(validateStreet);

  const {
    value: enteredCity,
    isValid: cityValueIsValid,
    inputFieldHasError: cityInputFieldHasError,
    inputValueChangedHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    setInputValueForUpdate: setCityValue,
  } = useInput(validateCity);

  const {
    value: enteredCountry,
    isValid: countryValueIsValid,
    inputFieldHasError: countryInputFieldHasError,
    inputValueChangedHandler: countryChangeHandler,
    blurHandler: countryBlurHandler,
    setInputValueForUpdate: setCountryValue,
  } = useInput(validateCountry);

  const {
    value: enteredProvince,
    isValid: provinceValueIsValid,
    inputFieldHasError: provinceInputFieldHasError,
    inputValueChangedHandler: provinceChangeHandler,
    blurHandler: provinceBlurHandler,
    setInputValueForUpdate: setProvinceValue,
  } = useInput(validateProvince);

  if (
    firstNameValueIsValid &&
    lastNameValueIsValid &&
    phoneNumberValueIsValid &&
    storeNameValueIsValid &&
    streetValueIsValid &&
    cityValueIsValid &&
    countryValueIsValid &&
    provinceValueIsValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  const getUserInformationByEmail = () => {
    const userEmail = user?.email || localStorage.getItem("email");
    axios
      .get("http://localhost:3000/service-provider/get-by-email/" + userEmail, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          return console.log("error loading information");
        }
        const { eventierUserInformation } = response.data;
        console.log(eventierUserInformation);
        if (eventierUserInformation.profile_picture_static_url) {
          setStaticProfilePictureUrl(
            "http://localhost:3000/profile-pictures/" +
              eventierUserInformation.email +
              "/" +
              eventierUserInformation.profile_picture_static_url
          );
        }
        setUserInformation({
          firstName: eventierUserInformation.first_name,
          lastName: eventierUserInformation.last_name,
          phoneNumber: eventierUserInformation.phone_number,
          storeName: eventierUserInformation.store_name,
          street: eventierUserInformation.street,
          city: eventierUserInformation.city,
          province: eventierUserInformation.province,
          email: eventierUserInformation.email,
          country: eventierUserInformation.country,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onProfilePictureSelect = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("eventierUserEmail", userInformation.email);
    formData.append("sp-profile-picture", e.target.files[0]);
    axios
      .post(
        "http://localhost:3000/service-provider/profile-picture/add",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStaticProfilePictureUrl(
          "http://localhost:3000/profile-pictures/" +
            userInformation.email +
            "/" +
            response.data.filename
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInformationByEmail();
  }, []);

  useEffect(() => {
    if (Object.keys(userInformation).length === 0) {
      return;
    }

    // new values
    console.log("setting values");
    setFirstNameValue(userInformation.firstName);
    setLastNameValue(userInformation.lastName);
    setPhoneNumberValue(userInformation.phoneNumber);
    setStoreNameValue(userInformation.storeName);
    setStreetValue(userInformation.street);
    setCityValue(userInformation.city);
    setCountryValue(userInformation.country);
    setProvinceValue(userInformation.province);
  }, [userInformation]);

  const sendUpdateApiCall = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    axios
      .patch(
        "http://localhost:3000/service-providers/update-profile",
        {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          phoneNumber: enteredPhoneNumber,
          addressStreet: enteredStreet,
          addressCity: enteredCity,
          addressProvince: enteredProvince,
          addressCountry: enteredCountry,
          storeName: enteredStoreName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        getUserInformationByEmail();
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="sp__profile-main-wrapper">
        <div className="sp__profile-container">
          <div className="sp__profile-image-container">
            <div className="sp__profile-picture-heading-container">
              <h3>Profile Picture</h3>
            </div>
            <img
              src={staticProfilePictureUrl}
              width="200"
              height="270"
              className="sp__profile-profile-picture"
              alt="User-Profile"
              onClick={() => profilePictureInputRef.current.click()}
            />
            <input
              ref={profilePictureInputRef}
              type="file"
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
              onChange={onProfilePictureSelect}
            />
          </div>
          <div className="sp__profile-information-container">
            <h3 className="sp__profile-user-info-heading">User Information</h3>
            <div className="sp__profile-information">
              <div>
                <div className="sub-entry">
                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {firstNameInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            First Name can not be empty and only contain
                            letters.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredFirstName}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        label="First Name"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      First Name: {userInformation.firstName}
                    </h6>
                  )}

                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {lastNameInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            Last Name can not be empty and only contain letters.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredLastName}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        label="Last Name"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      Last Name: {userInformation.lastName}
                    </h6>
                  )}

                  {!updateMode && (
                    <h6 className="sp__profile-info-heading">
                      Email: {userInformation.email}
                    </h6>
                  )}

                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {phoneNumberInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            Please provide a valid Phone Number.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredPhoneNumber}
                        onChange={phoneNumberChangeHandler}
                        onBlur={phoneNumberBlurHandler}
                        label="Phone Number"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      Phone Number: {userInformation.phoneNumber}
                    </h6>
                  )}
                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {storeNameInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            Please provide a valid Store Name.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredStoreName}
                        onChange={storeNameChangeHandler}
                        onBlur={storeNameBlurHandler}
                        label="Store Name"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      Store Name: {userInformation.storeName}
                    </h6>
                  )}
                </div>
                <div className="sub-entry">
                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {streetInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            Street value should be between (1-33) characters.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredStreet}
                        onChange={streetChangeHandler}
                        onBlur={streetBlurHandler}
                        label="Street"
                        required
                        placeholder="First Street A block Johar Town"
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      Street: {userInformation.street}
                    </h6>
                  )}

                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {cityInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            City value should be between (1-33) characters.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredCity}
                        onChange={cityChangeHandler}
                        onBlur={cityBlurHandler}
                        label="City"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      City: {userInformation.city}
                    </h6>
                  )}

                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {countryInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            Country value should be between (1-33) characters.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredCountry}
                        onChange={countryChangeHandler}
                        onBlur={countryBlurHandler}
                        label="Country"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      Country: {userInformation.country}
                    </h6>
                  )}

                  {updateMode ? (
                    <div className="sp__profile-input-wrapper">
                      {provinceInputFieldHasError && (
                        <div className="inputField__error-message-wrapper">
                          <span className="inputField__error-message-span">
                            Province value should be between (1-33) characters.
                          </span>
                        </div>
                      )}
                      <TextField
                        value={enteredProvince}
                        onChange={provinceChangeHandler}
                        onBlur={provinceBlurHandler}
                        label="Province"
                        required
                      />
                    </div>
                  ) : (
                    <h6 className="sp__profile-info-heading">
                      Province: {userInformation.province}
                    </h6>
                  )}
                </div>
              </div>
              <div className="sp__profile-button-container">
                {!updateMode && (
                  <Button
                    variant="contained"
                    onClick={() => setUpdateMode(true)}
                  >
                    Edit
                  </Button>
                )}

                {updateMode && (
                  <Fragment>
                    <div className="sp__profile-update-mode-btn-wrapper">
                      <Button variant="contained" onClick={sendUpdateApiCall}>
                        Update
                      </Button>
                    </div>
                    <div className="sp__profile-update-mode-btn-wrapper">
                      <Button
                        variant="contained"
                        onClick={() => setUpdateMode(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
