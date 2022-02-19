import React from 'react'
import { useState, useEffect } from "react";
import styles from "./addservice.css";
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export default function SigninPage() {
  const initialValues = {
    serviceName: "",
    serviceType: "",
    price: "",
    status: "",
    description: "",
    images: [],
    
  };


  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});



  const handleChange = (e) => {
    const { name, value } = e.target;
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
    
  };

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
  <div className="row">

    <div className=" col-lg-10 col-md-10 col-sm-10 addcard   ">
      <h1>Add Service</h1>
      <div className='row'>
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
            <p>{formErrors.price}</p>
          <h4>
            Add images
          </h4>
          <input 
            type="file" 
            multiple accept="image/*"
            onChange={handleChange} />
        </div>
        <div className=" col-lg-5 col-md-5 col-sm-6 cardRight   ">
        <label >Status</label>
        <select 
          name="status"
          className="form-control" 
          value={formValues.status}
          onChange={handleChange}>
          <option value="Enable">Enabled</option>
          <option value="Disable">Disabled</option>
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