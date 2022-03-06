import React from "react";
import { useState, useEffect } from "react";
import styles from "./addservice.css";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function SigninPage() {
// store this token in context api
const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudGllclVzZXJFbWFpbCI6ImtoYWFkaTEyM0BtYWlsLmNvbSIsInVzZXJSb2xlcyI6WyJzZXJ2aWNlX3Byb3ZpZGVyIl0sImlhdCI6MTY0NTI3NzA4NiwiZXhwIjoxNjQ1MjgwNjg2fQ.kTy_yQWRwEnWMi5b8bJj6Z-vxPA3mIoHiWzdlnlo9d0";

const initialValues = {
serviceName: "",
serviceType: "",
price: "",
status: "Active",
description: "",
discount: "",
};

const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setFormErrors] = useState({});
const [serviceImages, setServiceImages] = useState([]);

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

const handleImageUpload = (e) => {
if (!e.target.files[0]) {
return;
}
const formData = new FormData();
formData.append("serviceType", "hall");
formData.append("eventierUserEmail", "khaadi123@mail.com");
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
"http://localhost:3000/static/khaadi123@mail.com/" +
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
  <div className="row">
    <div className=" col-lg-10 col-md-10 col-sm-10 addcard   ">
      <h1>Add Service</h1>
      <div className="row">
        <div className=" col-lg-5 col-md-5 col-sm-5 cardLeft  ">
          <label>Service Name</label>
          <input size={5} type="text" className="form-control" name="serviceName" placeholder="Service Name"
            value={formValues.serviceName} onChange={handleChange} />
          <p>{formErrors.serviceName}</p>

          <label>Service Type</label>
          <input type="text" className="form-control" name="serviceType" placeholder="Service Type"
            value={formValues.serviceType} onChange={handleChange} />
          <p>{formErrors.serviceType}</p>

          <label>Price</label>
          <input type="number" className="form-control" name="price" placeholder="Price" value={formValues.price}
            onChange={handleChange} />
          <label>Discount</label>
          <input type="number" className="form-control" name="discount" placeholder="Discount"
            value={formValues.discount} onChange={handleChange} />
          <p>{formErrors.price}</p>
          <h4>Add images</h4>
          <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleImageUpload} />
          {/**
          add 5 hidden image tags and un-hide one by one
          as the serviceImages array has a new value
          pushed.
          */}
        </div>
        <div className=" col-lg-5 col-md-5 col-sm-6 cardRight   ">
          <label>Status</label>
          <select name="status" className="form-control" value={formValues.status} onChange={handleChange}>
            <option value="Enable">Active</option>
            <option value="Disable">In-Active</option>
          </select>
          <label>Description</label>
          <input size={5} type="text" className="form-control" name="description" placeholder="Add Description"
            value={formValues.description} onChange={handleChange} />
          <p>{formErrors.description}</p>
          <button type="button" className="btn btn-dark" onClick={handleSubmit}>
            Upload Service
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
);
}