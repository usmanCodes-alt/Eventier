import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Header from "../customerHeader/Header";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import avatar from "../../../profile_pic_avatar.png";

import "./CustomerProfile.css";

function CustomerProfile() {
  const [customerInformation, setCustomerInformation] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const hiddenFileInput = useRef();

  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastNam] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerProvince, setCustomerProvince] = useState("");
  const [customerStreet, setCustomerStreet] = useState("");

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
    setCustomerFirstName(customerInformation.first_name);
    setCustomerLastNam(customerInformation.last_name);
    setCustomerCountry(customerInformation.country);
    setCustomerProvince(customerInformation.province);
    setCustomerCity(customerInformation.city);
    setCustomerStreet(customerInformation.street);
  }, [customerInformation]);

  const updateProfile = (e) => {
    e.preventDefault();
    if (
      !customerFirstName ||
      !customerLastName ||
      !customerCountry ||
      !customerCity ||
      !customerProvince ||
      !customerStreet
    ) {
      return;
    }

    axios
      .patch(
        "http://localhost:3000/customers/update-profile",
        {
          firstName: customerFirstName,
          lastName: customerLastName,
          street: customerStreet,
          city: customerCity,
          country: customerCountry,
          province: customerProvince,
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
                  <TextField
                    label="First Name"
                    value={customerFirstName}
                    onChange={(e) => setCustomerFirstName(e.target.value)}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  First Name: {customerInformation.first_name}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  <TextField
                    className="profileDetail__input"
                    label="Last Name"
                    value={customerLastName}
                    onChange={(e) => setCustomerLastNam(e.target.value)}
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
                  <TextField
                    className="profileDetail__input"
                    label="Country"
                    value={customerCountry}
                    onChange={(e) => setCustomerCountry(e.target.value)}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  Country: {customerInformation.country}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  <TextField
                    className="profileDetail__input"
                    label="City"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  City: {customerInformation.city}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  <TextField
                    className="profileDetail__input"
                    label="Province"
                    value={customerProvince}
                    onChange={(e) => setCustomerProvince(e.target.value)}
                  />
                </div>
              ) : (
                <h5 className="profileDetail__info-heading">
                  Province: {customerInformation.province}
                </h5>
              )}
              {updateMode ? (
                <div className="profileDetail__input">
                  <TextField
                    className="profileDetail__input"
                    label="Street"
                    value={customerStreet}
                    onChange={(e) => setCustomerStreet(e.target.value)}
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
