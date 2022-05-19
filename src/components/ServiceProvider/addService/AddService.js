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
} from "../../../utils/inputs-validators";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Header from "../../ServiceProvider/Header/Header.js";
import "react-dropdown/style.css";
import AddButtonImage from "./img.png";
import "./addservice.css";

export default function AddService() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const { user, setUser } = useContext(UserContext);
  const hiddenFileInput = useRef();
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

  const [serviceImages, setServiceImages] = useState([]);

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
  } = useInput(validateServiceUnitPrice);

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

    if (!formIsValid || !status) {
      setRequiredFieldsError(true);
    }

    axios
      .post(
        "http://localhost:3000/service-providers/add-service",
        {
          serviceName: enteredServiceName,
          serviceType: selectedServiceType,
          serviceUnitPrice: enteredServicePrice,
          discount: enteredServiceDiscount,
          status,
          description: enteredServiceDescription,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
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
        console.log(err);
      });
  };

  const onImageSelectClicked = (e) => {
    if (!selectedServiceType) {
      alert("Please select a service type first");
      e.preventDefault();
    }
  };

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("serviceType", selectedServiceType);
    formData.append("eventierUserEmail", user.email);
    formData.append("serviceImage", e.target.files[0]);
    console.log(formData);
    axios
      .post(
        "http://localhost:3000/service-provider/add-service/upload-image",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setServiceImages((oldServiceImagesArray) => [
          ...oldServiceImagesArray,
          `http://localhost:3000/static/${user.email}/` +
            response.data.filename,
        ]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(serviceImages);
  }, [serviceImages]);

  return (
    <div className="sp__add-service-container">
      <Header />
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
                  Discount can not be empty or negative and should only contain
                  numbers.
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
              onChange={handleImageUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
            {serviceImages.length !== 0 && (
              <div className="sp__add-service-uploaded-images">
                {serviceImages.map((image) => (
                  <img src={image} alt="Service" width="60" height="60" />
                ))}
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
