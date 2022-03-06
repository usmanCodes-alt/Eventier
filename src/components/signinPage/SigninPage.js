import styles from "./signin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
  let navigate = useNavigate();
  const initialValues = { userEmail: "", userPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState("");
  // const [isSubmit, setIsSubmit] = useState(false);
  // const firstUpdate = useRef(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // setFormErrors(validate(formValues));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }
    axios
      .post("http://localhost:3000/eventier/login", {
        email: formValues.userEmail,
        password: formValues.userPassword,
      })
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        localStorage.setItem("jwt", response.data.token);
        navigate("vendordashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (values) => {
    const errors = {};
    var validator = require("email-validator");
    if (!values.userEmail) {
      errors.email = "Email is required!";
    } else if (!validator.validate(values.userEmail)) {
      errors.email = "Email is not valid!";
    }

    if (!values.userPassword) {
      errors.password = "Password is required";
    }

    console.log(errors);

    return errors;
  };

  return (
    <div className="container-fluid Signin">
      <div className="row">
        <div className=" col-lg-6 col-md-6 col-sm-6 logo ">
          <img src={logo} alt=" error" />
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5 Signin-Form">
          <div>
            <div className="Signin-label">
              <h1>Sign In</h1>
            </div>
            <br />
            <br />
            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="userEmail"
                placeholder="Email"
                value={formValues.userEmail}
                onChange={handleChange}
              />

              <p>{formErrors.email}</p>

              <label>Password</label>

              <input
                type="password"
                className="form-control"
                name="userPassword"
                placeholder="Passowrd"
                value={formValues.password}
                onChange={handleChange}
              />

              <p>{formErrors.password}</p>

              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
            <p
              onClick={() => {
                navigate("/signupPage");
              }}
            >
              Don't Have an Account ?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
