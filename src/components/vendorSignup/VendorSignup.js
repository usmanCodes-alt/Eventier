import styles from "./vendorSignup.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";

export default function VendorSignup() {
const initialValues = {
firstName: "",
lastName: "",
userEmail: "",
userPassword: "",
confirmPassword: "",
storeName : "",
country : "",
city : "",
province : "",
street : "",
phoneNumber: "",
};
const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setFormErrors] = useState({});
// const [isSubmit, setIsSubmit] = useState(false);

const handleChange = (e) => {
const { name, value } = e.target;
setFormValues({ ...formValues, [name]: value });
};

const handleSubmit = (e) => {
e.preventDefault();
let errors = validate(formValues);
setFormErrors(errors);
// setIsSubmit(true);
if (Object.keys(errors).length !== 0) {
return;
}

};

const validate = (values) => {
const errors = {};
if (!values.firstName) {
errors.firstName = "First Name is required!";
}
if (!values.lastName) {
errors.lastName = "Last Name is required!";
}
var validator = require("email-validator");
if (!values.userEmail) {
errors.email = "Email is required!";
} else if (!validator.validate(values.userEmail)) {
errors.email = "Email is not valid!";
}

if (!values.userPassword) {
errors.password = "Password is required";
} else if (!values.confirmPassword) {
errors.confirmPassword = "Confirm Password is required";
} else if (values.userPassword != values.confirmPassword) {
errors.confirmPassword = "Password doesnot match";
}

if (!values.storeName) {
errors.storeName = "Store Name is required!";
}
if (!values.country) {
errors.country = "Country is required!";
}
if (!values.country) {
errors.country = "Country is required!";
}
if (!values.phoneNumber) {
errors.phoneNumber = "Phone Number is required!";
}
return errors;
};

const changeRoute = () => {};

return (
<div className="container-fluid VSignup">
  <div className="row">
    <div className=" col-lg-6 col-md-6 col-sm-6 logo ">
      <img src={logo} alt=" error" />
    </div>
    <div className="col-lg-5 col-md-5 col-sm-5 VSignup-Form">
      <div>
        <div className="VSignup-label">
          <h1>Signup</h1>
        </div>
        <br />
        <br />
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" className="form-control " name="firstName" placeholder="First Name"
            value={formValues.firstName} onChange={handleChange} />
          <p>{formErrors.firstName}</p>

          <label>Last Name</label>
          <input type="text" className="form-control" name="lastName" placeholder="Last Name"
            value={formValues.lastName} onChange={handleChange} />
          <p>{formErrors.lastName}</p>

          <label>Email</label>
          <input type="email" className="form-control" name="userEmail" placeholder="Email" value={formValues.userEmail}
            onChange={handleChange} />
          <p>{formErrors.email}</p>

          <label>Password</label>
          <input type="password" className="form-control" name="userPassword" placeholder="Passowrd"
            value={formValues.password} onChange={handleChange} />
          <p>{formErrors.password}</p>

          <label>Confirm Password</label>
          <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password"
            value={formValues.confirmPassword} onChange={handleChange} />
          <p>{formErrors.confirmPassword}</p>

          <label>Store Name</label>
          <input type="text" className="form-control" name="storeName" placeholder="Store Name"
            value={formValues.storeName} onChange={handleChange} />
          <p>{formErrors.storeName}</p>

          <label>Country</label>
          <input type="text" className="form-control" name="country" placeholder="Country" value={formValues.country}
            onChange={handleChange} />
          <p>{formErrors.country}</p>

          <label>City</label>
          <input type="text" className="form-control" name="city" placeholder="City" value={formValues.City}
            onChange={handleChange} />
          <p>{formErrors.city}</p>

          <label>Province</label>
          <input type="text" className="form-control" name="province" placeholder="Province" value={formValues.province}
            onChange={handleChange} />
          <p>{formErrors.province}</p>

          <label>Street</label>
          <input type="text" className="form-control" name="street" placeholder="Street" value={formValues.street}
            onChange={handleChange} />
          <p>{formErrors.street}</p>

          <label>Phone Number</label>
          <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control " name="phoneNumber"
            placeholder="Phone Number" value={formValues.phoneNumber} onChange={handleChange} />
          <p>{formErrors.phoneNumber}</p>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="terms" />
          <label className="form-check-label">
            I agree with terms and use of policy
          </label>
        </div>
        <button type="button" className="btn btn-dark" onClick={handleSubmit}>

          SignUp
        </button>
        <p onClick={changeRoute}>Already have an account?</p>
      </div>
    </div>
  </div>
</div>
);
}