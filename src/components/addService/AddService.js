import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/auth-context";
import styles from "./addservice.css";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-dropdown";
import Header from "../Header/Header.js";
import "react-dropdown/style.css";
import logo from "./img.png" 

export default function SigninPage() {
  // store this token in context api

  
  const token = localStorage.getItem("auth_token");
  const { user, setUser } = useContext(UserContext);
  const [urlsArrayTemp, setUrlsArrayTemp] = useState(["https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" , "https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg"])

  
  

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  const initialValues = {
    serviceName: "",
    serviceType: "",
    price: "",
    status: "active",
    description: "",
    discount: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [serviceImages, setServiceImages] = useState([]);// is array ki jaga wo oper wali use kr ok and yes, wait

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(formValues);
    setFormErrors(errors);
    console.log(formValues);
    // setIsSubmit(true);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    const apiObject = {
      serviceName: formValues.serviceName,
      serviceType: formValues.serviceType,
      serviceUnitPrice: formValues.price,
      discount: formValues.discount,
      description: formValues.description,
      status: formValues.status,
    };

    axios
      .post("http://localhost:3000/service-providers/add-service", apiObject, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onImageSelectClicked = (e) => {
    if (!formValues.serviceType) {
      alert("Please select a service type first");
      e.preventDefault();
    }
  };

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("serviceType", formValues.serviceType);
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

  const validate = (values) => {
    const errors = {};
    if (!values.serviceName) {
      errors.serviceName = "Service Name is required!";
    }
    if (!values.serviceType) {
      errors.serviceType = "Service Type is required!";
    }
    if (!values.price) {
      errors.price = "Price is required!";
    }

    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.status) {
      errors.status = "Status is required!";
    }
    return errors;
  };

  return (
    <div className="container-fluid addService">
      <Header />
      <div className="row">
        <div className=" col-lg-10 col-md-10 col-sm-10 addcard   ">
          <h1>Add Service</h1>
          <div className="row">
            <div className=" col-lg-5 col-md-5 col-sm-5 cardLeft  ">
              <label>Service Name</label>
              <input
                size={5}
                type="text"
                className="form-control"
                name="serviceName"
                placeholder="Service Name"
                value={formValues.serviceName}
                onChange={handleChange}
              />
              <p>{formErrors.serviceName}</p>

              <label>Service Type</label>
              <input
                type="text"
                className="form-control"
                name="serviceType"
                placeholder="Service Type"
                value={formValues.serviceType}
                onChange={handleChange}
              />
              <p>{formErrors.serviceType}</p>

              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price"
                value={formValues.price}
                onChange={handleChange}
              />
              <label>Discount</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                placeholder="Discount"
                value={formValues.discount}
                onChange={handleChange}
              />
              <p>{formErrors.price}</p>
              <h4>Add images</h4>
              <input
                type ="image"
                width="70" height="70"
                src={logo}
                onClick={onImageSelectClicked}
                
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageUpload}
              />
              
              
              {urlsArrayTemp.map(e =>
            
              <img src={e} alt="error"   width="70" height="70"/>
                ) }
                {/* <button>
                  <img src={logo} alt="Image Not Found"   width="70" height="70"
                onClick={onImageSelectClicked}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageUpload}
                />
                </button>
                
              </div> */}
            
              {/**
          add 5 hidden image tags and un-hide one by one
          as the serviceImages array has a new value
          pushed.
          */}
            </div>
            <div className=" col-lg-5 col-md-5 col-sm-6 cardRight   ">
              <label>Status</label>
              <select
                name="status"
                className="form-control"
                value={formValues.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              <label>Description</label>
              <input
                size={5}
                type="text"
                className="form-control"
                name="description"
                placeholder="Add Description"
                value={formValues.description}
                onChange={handleChange}
              />
              <p>{formErrors.description}</p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                Upload Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
