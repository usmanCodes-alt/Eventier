import React from 'react'
import { useState, useEffect } from "react";
import styles from "./ProfileDetail.css";
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Alert } from 'bootstrap';


export default function SigninPage() {
  const initialValues = {
    firstName: "Faizan Ali",
    lastName: "Younas",
    phoneNumber: "+923136113319",
    street: "Street No 5",
    city: "Lahore",
    country: "Pakistan",
    province: "Punjab" 
    
  };
  const passwordvalues = {
      oldpass: "",
      newpass: "",
      cnfrmpass: ""
  }

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [password, setpassword] = useState(passwordvalues);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setpassword({ ...password, [name]: value });
  };
  const handleUpdate = (e) =>{
      console.log("on click update")
  }

  const handleSubmit = (e) => {
   
    e.preventDefault();
    let errors = validate(password);
    setFormErrors(errors);
    
    // setIsSubmit(true);
    
    if (Object.keys(errors).length !== 0) {
      return;
    }else{
        console.log(password);
    }
    
  };

  const validate = (values) => {
    const errors = {};
    if (!values.oldpass) {
      errors.oldpass = "Old Password is required!";
    }
    if (!values.newpass) {
        errors.newpass = "Password is required";
      } else if (!values.cnfrmpass) {
        errors.cnfrmpass = "Confirm Password is required";
      } else if (values.newpass != values.cnfrmpass) {
        errors.cnfrmpass = "Password doesnot match";
      }
    return errors;
  };

return (
<div className="container-fluid profileDetail">
  <div className="row">

    <div className=" col-lg-7 col-md-7 col-sm-7 addcardDetail   ">
      
    <div className="page-content page-container" id="page-content">
    <div className="padding">
        <div className="row container d-flex justify-content-center">
            <div className="col-xl-12 col-md-12">
                <div className="card user-card-full">
                    <div className="row m-l-0 m-r-0">
                        <div className="col-sm-4 bg-c-lite-green user-profile">
                            <div className="card-block text-center text-white">
                                <div className="m-b-25">
                                    <h4>Profile Picture</h4>
                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image"/> 
                                </div>
                                <h6 className="f-w-600">{formValues.firstName} {formValues.lastName}</h6>
                               
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="card-block">
                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Personal Information</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Email</p>
                                        <h6 className="text-muted f-w-400">test@gmail.com</h6>
                                       
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Phone</p>
                                        
                                        <h6 className="text-muted f-w-400">{formValues.phoneNumber}</h6>   
                                    </div>
                                </div>
                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Address</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Street</p>
                                        <h6 className="text-muted f-w-400">{formValues.street}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">City</p>
                                        <h6 className="text-muted f-w-400">{formValues.city}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Country</p>
                                        <h6 className="text-muted f-w-400">{formValues.country}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Province</p>
                                        <h6 className="text-muted f-w-400">{formValues.province}</h6>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-dark btndetail"
                                        onClick={handleUpdate}
                                        > 
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
       
    </div>


    <div className='col-lg-4 col-md-4 col-sm-4 cardleftMost'>
    <h1>Change Password</h1>

    <label>Old Password</label>
          <input  
            type="password" 
            className="form-control" 
            name="oldpass" 
            placeholder="Old Password" 
            value={password.oldpass}
            onChange={handleChange} 
            />
            <p>{formErrors.oldpass}</p>

          <label>New Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="newpass"
            placeholder="New Password"
            value={password.newpass}
            onChange={handleChange} 
            />
            <p>{formErrors.newpass}</p>

          <label>Confirm New Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="cnfrmpass"
            placeholder="Confirm New Password" 
            value={password.cnfrmpass}  
            onChange={handleChange} 
            />
            <p>{formErrors.cnfrmpass}</p>
            <button
              type="button"
              className="btn btn-dark btndetail"
              onClick={handleSubmit}
            > 
              Update Password
            </button>
      
  </div>
  </div>
  
</div>
);
}