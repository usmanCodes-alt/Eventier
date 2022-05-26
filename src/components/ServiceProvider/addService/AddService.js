import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";

import useInput from "../../../hooks/use-input";
import {
  validateServiceName,
  validateServiceType,
  validateServiceUnitPrice,
  validateDescription,
  validateDiscount,
} from "../../../utils/inputs-validators";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Header from "../../ServiceProvider/Header/Header.js";
import "react-dropdown/style.css";
import AddButtonImage from "../../../images/add-btn-img.png";
import "./addservice.css";

export default function AddService() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const { user, setUser } = useContext(UserContext);
  const hiddenFileInput = useRef();
  const [serviceAlreadyExistsError, setServiceAlreadyExistsError] =
    useState(false);
  let formIsValid = false;

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  const [serviceImagesSelected, setServiceImagesSelected] = useState([]);
  const [serviceImagesObjectUrls, setServiceImagesObjectUrls] = useState([]);
  const [serviceImagesLimitExceeded, setServiceImagesLimitExceeded] =
    useState(false);

  const [status, setStatus] = useState("active");
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);

  const {
    value: enteredServiceName,
    isValid: serviceNameValueIsValid,
    inputFieldHasError: serviceNameInputFieldHasError,
    inputValueChangedHandler: serviceNameChangeHandler,
    blurHandler: serviceNameBlurHandler,
  } = useInput(validateServiceName);

  const {
    value: selectedServiceType,
    isValid: serviceTypeValueIsValid,
    inputFieldHasError: serviceTypeInputFieldHasError,
    inputValueChangedHandler: serviceTypeChangeHandler,
    blurHandler: serviceTypeBlurHandler,
  } = useInput(validateServiceType);

  const {
    value: enteredServicePrice,
    isValid: servicePriceValueIsValid,
    inputFieldHasError: servicePriceInputFieldHasError,
    inputValueChangedHandler: servicePriceChangeHandler,
    blurHandler: servicePriceBlurHandler,
  } = useInput(validateServiceUnitPrice);

  const {
    value: enteredServiceDiscount,
    isValid: serviceDiscountValueIsValid,
    inputFieldHasError: serviceDiscountInputFieldHasError,
    inputValueChangedHandler: serviceDiscountChangeHandler,
    blurHandler: serviceDiscountBlurHandler,
  } = useInput(validateDiscount);

  const {
    value: enteredServiceDescription,
    isValid: serviceDescriptionValueIsValid,
    inputFieldHasError: serviceDescriptionInputFieldHasError,
    inputValueChangedHandler: serviceDescriptionChangeHandler,
    blurHandler: serviceDescriptionBlurHandler,
  } = useInput(validateDescription);

  if (
    serviceNameValueIsValid &&
    serviceTypeValueIsValid &&
    servicePriceValueIsValid &&
    serviceDiscountValueIsValid &&
    serviceDescriptionValueIsValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const onServiceStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("eventierUserEmail", user.email);
    formData.append("serviceType", selectedServiceType);
    Object.values(serviceImagesSelected).forEach((file) => {
      formData.append("service-images", file);
    });

    formData.append("serviceName", enteredServiceName);
    formData.append("serviceUnitPrice", enteredServicePrice);
    formData.append("discount", enteredServiceDiscount);
    formData.append("status", status);
    formData.append("description", enteredServiceDescription);

    if (!formIsValid || !status) {
      setRequiredFieldsError(true);
    }

    axios
      .post(
        "http://localhost:3000/service-providers/add-service-with-images",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate("/service-provider/my-services");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setServiceAlreadyExistsError(true);
          return;
        }
      });
  };

  const onImageSelectClicked = (e) => {
    if (!selectedServiceType) {
      alert("Please select a service type first");
      e.preventDefault();
    }
  };

  const handleMultipleImageUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    if (e.target.files.length > 5 || serviceImagesSelected.length >= 5) {
      setServiceImagesLimitExceeded(true);
      return;
    }

    setServiceImagesSelected((oldServiceImagesSelectedArray) => {
      return [...oldServiceImagesSelectedArray, ...e.target.files];
    });
    for (const file of e.target.files) {
      setServiceImagesObjectUrls((oldObjectUrls) => [
        ...oldObjectUrls,
        URL.createObjectURL(file),
      ]);
    }
  };

  useEffect(() => {
    console.log(serviceImagesSelected);
  }, [serviceImagesSelected]);

  return (
    <div className="sp__add-service-container">
      <Header />
      {serviceImagesLimitExceeded && (
        <Alert
          severity="error"
          onClose={() => setServiceImagesLimitExceeded(false)}
        >
          You only not choose more than 5 images.
        </Alert>
      )}
      <div className="sp__add-service-form-container">
        <div className="sp__add-service-heading-container">
          <h4>Add New Service</h4>
        </div>
        {requiredFieldsError && (
          <div>
            <div className="customerLogin__error-container">
              <div>Please provide all fields properly.</div>
            </div>
          </div>
        )}
        {serviceAlreadyExistsError && (
          <div>
            <div className="customerLogin__error-container">
              <div>You already have a service with this same service type!</div>
            </div>
          </div>
        )}
        <div className="sp__add-service-inputs-container">
          <div className="sp__add-service-sub-entry">
            {serviceNameInputFieldHasError && (
              <div className="inputField__error-message-wrapper">
                <span className="inputField__error-message-span">
                  Invalid Service Name.
                </span>
              </div>
            )}
            <TextField
              value={enteredServiceName}
              label="Service Name"
              onChange={serviceNameChangeHandler}
              onBlur={serviceNameBlurHandler}
              required
            />

            <FormControl>
              {serviceTypeInputFieldHasError && (
                <div className="inputField__error-message-wrapper">
                  <span className="inputField__error-message-span">
                    Service Type can not be empty.
                  </span>
                </div>
              )}
              <InputLabel>Service Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedServiceType}
                label="Service Type"
                onChange={serviceTypeChangeHandler}
                onBlur={serviceTypeBlurHandler}
              >
                <MenuItem value="Rent a Car">Rent a Car</MenuItem>
                <MenuItem value="Decoration">Decoration</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
              </Select>
            </FormControl>

            {servicePriceInputFieldHasError && (
              <div className="inputField__error-message-wrapper">
                <span className="inputField__error-message-span">
                  Unit price can not be empty or negative and should only
                  contain numbers.
                </span>
              </div>
            )}
            <TextField
              value={enteredServicePrice}
              label="Price"
              type="number"
              onChange={servicePriceChangeHandler}
              onBlur={servicePriceBlurHandler}
            />

            {serviceDiscountInputFieldHasError && (
              <div className="inputField__error-message-wrapper">
                <span className="inputField__error-message-span">
                  Discount can not be empty or contain any special characters
                  and should be between 0-100.
                </span>
              </div>
            )}
            <TextField
              value={enteredServiceDiscount}
              label="Discount %"
              onChange={serviceDiscountChangeHandler}
              onBlur={serviceDiscountBlurHandler}
            />
          </div>
          <div className="sp__add-service-sub-entry">
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={onServiceStatusChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="in-active">In-Active</MenuItem>
              </Select>
            </FormControl>

            {serviceDescriptionInputFieldHasError && (
              <div className="inputField__error-message-wrapper">
                <span className="inputField__error-message-span">
                  Service Description can not be empty and can only contain
                  maximum of 500 characters.
                </span>
              </div>
            )}
            <TextField
              value={enteredServiceDescription}
              label="Description"
              onChange={serviceDescriptionChangeHandler}
              onBlur={serviceDescriptionBlurHandler}
              multiline
              rows={2}
            />
            <img
              width="70"
              height="70"
              src={AddButtonImage}
              alt="Add Pictures"
              onClick={() => hiddenFileInput.current.click()}
            />
            <input
              type="file"
              onClick={onImageSelectClicked}
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleMultipleImageUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
              multiple
            />
            {serviceImagesObjectUrls.length !== 0 && (
              <div className="sp__add-service-uploaded-images">
                {serviceImagesObjectUrls.map((objectUrl) => {
                  return (
                    <img
                      className="sp__add-service-img"
                      src={objectUrl}
                      alt="Service"
                      width="60"
                      height="60"
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="sp__add-service-tn-container">
          <Button variant="contained" onClick={handleSubmit}>
            Add Service
          </Button>
        </div>
      </div>
    </div>
  );
}
