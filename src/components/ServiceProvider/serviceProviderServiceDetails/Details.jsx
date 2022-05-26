import Header from "../Header/Header.js";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useInput from "../../../hooks/use-input";

import {
  validateFirstName,
  validateServiceUnitPrice,
  validateServiceStatus,
  validateDescription,
  validateDiscount,
} from "../../../utils/inputs-validators.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";

import AddButtonImage from "../../../images/add-btn-img.png";
import "./details.css";

export default function ServiceDetails() {
  const { state } = useLocation();
  let { serviceId } = state;
  let formIsValid = false;

  const hiddenFileInput = useRef();
  const [serviceInDatabase, setServiceInDatabase] = useState();
  const [reviews, setReviews] = useState();
  const [serviceImagesLimitExceeded, setServiceImagesLimitExceeded] =
    useState(false);

  const [updateMode, setUpdateMode] = useState(false);
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);

  const {
    value: enteredServiceName,
    isValid: enteredServiceNameIsValid,
    inputFieldHasError: serviceNameInputFieldHasError,
    inputValueChangedHandler: serviceNameChangeHandler,
    setInputValueForUpdate: setServiceNameValue,
    blurHandler: serviceNameBlurHandler,
  } = useInput(validateFirstName);

  const {
    value: enteredServiceUnitPrice,
    isValid: enteredServiceUnitPriceIsValid,
    inputFieldHasError: serviceUnitPriceInputFieldHasError,
    inputValueChangedHandler: serviceUnitPriceValueChangeHandler,
    setInputValueForUpdate: setServiceUnitPriceValue,
    blurHandler: serviceUnitPriceBlurHandler,
  } = useInput(validateServiceUnitPrice);

  const {
    value: enteredServiceDiscount,
    isValid: enteredServiceDiscountIsValid,
    inputFieldHasError: serviceDiscountInputFieldHasError,
    inputValueChangedHandler: serviceDiscountValueChangeHandler,
    setInputValueForUpdate: setServiceDiscountValue,
    blurHandler: serviceDiscountBlurHandler,
  } = useInput(validateDiscount);

  const {
    value: selectedServiceStatus,
    isValid: serviceStatusStatusValueIsValid,
    inputFieldHasError: serviceStatusInputFieldHasError,
    inputValueChangedHandler: serviceStatusChangeHandler,
    setInputValueForUpdate: setServiceStatusValue,
    blurHandler: serviceStatusBlurHandler,
  } = useInput(validateServiceStatus);

  const {
    value: enteredServiceDescription,
    isValid: serviceDescriptionValueIsValid,
    inputFieldHasError: serviceDescriptionInputFieldHasError,
    inputValueChangedHandler: serviceDescriptionChangeHandler,
    setInputValueForUpdate: setServiceDescriptionValue,
    blurHandler: serviceDescriptionBlurHandler,
  } = useInput(validateDescription);

  console.log(
    enteredServiceNameIsValid,
    enteredServiceUnitPriceIsValid,
    enteredServiceDiscountIsValid,
    serviceStatusStatusValueIsValid,
    serviceDescriptionValueIsValid
  );

  if (
    enteredServiceNameIsValid &&
    enteredServiceUnitPriceIsValid &&
    enteredServiceDiscountIsValid &&
    serviceStatusStatusValueIsValid &&
    serviceDescriptionValueIsValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const getServiceDetailById = () => {
    axios
      .get(`http://localhost:3000/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.service);
          setServiceInDatabase(res.data.service);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getServiceReviews = (id) => {
    axios
      .get(
        "http://localhost:3000/service-providers/get-ratings-and-reviews/" +
          serviceId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setReviews(res.data.REVIEWS);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onImageDeleteIconClicked = (imageStaticUrl) => {
    console.log(imageStaticUrl);
    axios
      .delete("http://localhost:3000/service-provider/delete-service-img", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        data: {
          serviceImageStaticUrl: imageStaticUrl,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setServiceInDatabase((oldService) => {
            return {
              ...oldService,
              static_urls: oldService.static_urls.filter(
                (url) => url !== imageStaticUrl
              ),
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServiceDetailById();
    getServiceReviews(serviceId);
  }, []);

  useEffect(() => {
    if (!serviceInDatabase) return;

    // new values
    setServiceNameValue(serviceInDatabase.service_name);
    setServiceUnitPriceValue(serviceInDatabase.unit_price);
    setServiceDiscountValue(serviceInDatabase.discount);
    setServiceStatusValue(serviceInDatabase.status);
    setServiceDescriptionValue(serviceInDatabase.description);
  }, [serviceInDatabase]);

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("uniqueImageUuid", serviceInDatabase.images_uuid);
    formData.append("serviceType", serviceInDatabase.service_type);
    formData.append("eventierUserEmail", serviceInDatabase.email);
    formData.append("service-image", e.target.files[0]);
    console.log(formData);
    axios
      .post(
        "http://localhost:3000/service-providers/update-service/add-service-image",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setServiceInDatabase((oldService) => {
            console.log("Adding image url");
            let static_url_array = [];
            if (oldService.static_urls) {
              static_url_array = [
                ...oldService.static_urls,
                `http://localhost:3000/static/${serviceInDatabase.email}/${response.data.filename}`,
              ];
            } else {
              static_url_array = [
                `http://localhost:3000/static/${serviceInDatabase.email}/${response.data.filename}`,
              ];
            }
            return {
              ...oldService,
              static_urls: static_url_array,
            };
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setServiceImagesLimitExceeded(true);
        }
      });
  };

  const updateService = (e) => {
    e.preventDefault();

    console.log(formIsValid);

    if (!formIsValid) {
      setRequiredFieldsError(true);
      return;
    }

    axios
      .patch(
        "http://localhost:3000/service-provider/update-service",
        {
          serviceId,
          serviceName: enteredServiceName,
          unitPrice: enteredServiceUnitPrice,
          serviceStatus: selectedServiceStatus,
          description: enteredServiceDescription,
          discount: enteredServiceDiscount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // service has been updated
          getServiceDetailById();
          setUpdateMode(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdateCancelClicked = (e) => {
    setUpdateMode(false);
    setRequiredFieldsError(false);
  };

  if (!serviceInDatabase) {
    return <h1>Please wait</h1>;
  }

  return (
    <div className="sp__service-details-container">
      <Header />
      {serviceImagesLimitExceeded && (
        <Alert
          severity="error"
          onClose={() => setServiceImagesLimitExceeded(false)}
        >
          You only not choose more than 5 images.
        </Alert>
      )}

      <div className="sp__service-details-wrapper">
        <div className="sp__service-details-information-container">
          <h4 className="sp__service-details-information-heading">
            Information
          </h4>
          {requiredFieldsError && (
            <div className="customerLogin__error-container">
              <div>Please provide all required fields correctly.</div>
            </div>
          )}
          <div className="sp__service-details-information">
            <div className="sub-entry">
              {updateMode ? (
                <div className="sp__service-details-update-input-wrapper">
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
                </div>
              ) : (
                <h5 className="sp__service-details-information-content">
                  Service Name: {serviceInDatabase.service_name}
                </h5>
              )}

              {updateMode ? (
                <div className="sp__service-details-update-input-wrapper">
                  {serviceUnitPriceInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Unit price can not be empty or negative and should only
                        contain numbers.
                      </span>
                    </div>
                  )}
                  <TextField
                    value={enteredServiceUnitPrice}
                    label="Unit Price"
                    onChange={serviceUnitPriceValueChangeHandler}
                    onBlur={serviceUnitPriceBlurHandler}
                    required
                  />
                </div>
              ) : (
                <h5 className="sp__service-details-information-content">
                  Unit Price: {serviceInDatabase.unit_price}
                </h5>
              )}

              {updateMode ? (
                <div className="sp__service-details-update-input-wrapper">
                  {serviceDiscountInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Discount can not be empty or negative and should only
                        contain numbers.
                      </span>
                    </div>
                  )}
                  <TextField
                    value={enteredServiceDiscount}
                    label="Discount"
                    onChange={serviceDiscountValueChangeHandler}
                    onBlur={serviceDiscountBlurHandler}
                    required
                  />
                </div>
              ) : (
                <h5 className="sp__service-details-information-content">
                  Discount: {serviceInDatabase.discount}
                </h5>
              )}

              {updateMode ? (
                <div className="sp__service-details-update-input-wrapper">
                  {serviceStatusInputFieldHasError && (
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
                    value={selectedServiceStatus}
                    label="Service Type"
                    onChange={serviceStatusChangeHandler}
                    onBlur={serviceStatusBlurHandler}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="in-active">In-Active</MenuItem>
                  </Select>
                </div>
              ) : (
                <h5 className="sp__service-details-information-content">
                  Status: {serviceInDatabase.status}
                </h5>
              )}
            </div>
            <div className="sub-entry">
              {!updateMode && (
                <React.Fragment>
                  <h5 className="sp__service-details-information-content">
                    Service Type: {serviceInDatabase.service_type}
                  </h5>
                  <h5 className="sp__service-details-information-content">
                    Block Status:{" "}
                    {serviceInDatabase.blocked === "0" ? "No" : "Yes"}
                  </h5>
                </React.Fragment>
              )}

              {updateMode ? (
                <div className="sp__service-details-update-input-wrapper">
                  {serviceDescriptionInputFieldHasError && (
                    <div className="inputField__error-message-wrapper">
                      <span className="inputField__error-message-span">
                        Service Description can not be empty and can only
                        contain maximum of 500 characters.
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
                </div>
              ) : (
                <h5 className="sp__service-details-information-content">
                  Description: {serviceInDatabase.description}
                </h5>
              )}
            </div>
          </div>
          {!updateMode && (
            <Button
              variant="contained"
              className="sp__service-details-edit-btn"
              onClick={(e) => setUpdateMode(true)}
            >
              Edit
            </Button>
          )}

          {updateMode && (
            <div className="sp__service-details-update-cancel-btn-wrapper">
              <Button variant="contained" onClick={updateService}>
                Update
              </Button>
              <Button variant="contained" onClick={onUpdateCancelClicked}>
                Cancel
              </Button>
            </div>
          )}
        </div>
        <div className="sp__service-details-images-and-reviews-container">
          <div className="sp__service-details-images-container">
            <div>
              <h4>Images</h4>
              <div className="sp__service-details-all-images-container">
                {serviceInDatabase.static_urls ? (
                  serviceInDatabase.static_urls.map((image) => (
                    <div className="sp__service-details-img">
                      <img src={image} alt="Service" width="60" height="60" />
                      <DeleteIcon
                        className="sp__service-details-delete-img-icon"
                        onClick={onImageDeleteIconClicked.bind(this, image)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No images!</p>
                )}
              </div>
            </div>
            <img
              width="70"
              height="70"
              src={AddButtonImage}
              alt="Add Pictures"
              onClick={() => hiddenFileInput.current.click()}
            />
            <input
              type="file"
              //   onClick={onImageSelectClicked}
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleImageUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <h4>Reviews</h4>
            {reviews && reviews.length !== 0 ? (
              <div className="sp__service-details-reviews-container">
                {reviews.map((review) => (
                  <p>{review.review_message}</p>
                ))}
              </div>
            ) : (
              <p>No reviews!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
