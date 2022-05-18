import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import "./addservice.css";
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

export default function AddService() {
  // store this token in context api

  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const { user, setUser } = useContext(UserContext);
  const hiddenFileInput = useRef();

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

  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);

  const onServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };
  const onServiceTypeChange = (e) => {
    console.log(e.target.value);
    setServiceType(e.target.value);
  };
  const onServicePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const onServiceStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const onServiceDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onServiceDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let errors = validate(formValues);
    // setFormErrors(errors);
    // console.log(formValues);
    // // setIsSubmit(true);

    // if (Object.keys(errors).length !== 0) {
    //   return;
    // }

    // const apiObject = {
    //   serviceName: formValues.serviceName,
    //   serviceType: formValues.serviceType,
    //   serviceUnitPrice: formValues.price,
    //   discount: formValues.discount,
    //   description: formValues.description,
    //   status: formValues.status,
    // };
    console.log({
      serviceName,
      serviceType,
      price,
      discount,
      status,
      description,
    });

    axios
      .post(
        "http://localhost:3000/service-providers/add-service",
        {
          serviceName,
          serviceType,
          serviceUnitPrice: price,
          discount,
          status,
          description,
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
    if (!serviceType) {
      alert("Please select a service type first");
      e.preventDefault();
    }
  };

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("serviceType", serviceType);
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
        <div className="sp__add-service-inputs-container">
          <div className="sp__add-service-sub-entry">
            <TextField
              value={serviceName}
              label="Service Name"
              onChange={onServiceNameChange}
            />
            <FormControl>
              <InputLabel>Service Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={serviceType}
                label="Service Type"
                onChange={onServiceTypeChange}
              >
                <MenuItem value="Rent a Car">Rent a Car</MenuItem>
                <MenuItem value="Decoration">Decoration</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={price}
              label="Price"
              onChange={onServicePriceChange}
            />
            <TextField
              value={discount}
              label="Discount"
              onChange={onServiceDiscountChange}
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
            <TextField
              value={description}
              label="Description"
              onChange={onServiceDescriptionChange}
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
