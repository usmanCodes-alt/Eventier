import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";

import "./SignupCss.css";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onStoreNameChanged = (e) => setStoreName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);
  const onStreetChanged = (e) => setStreet(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onProvinceChanged = (e) => setProvince(e.target.value);
  const onCountryChanged = (e) => setCountry(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !storeName ||
      !email ||
      !password ||
      !confirmPassword ||
      !street ||
      !city ||
      !province ||
      !country ||
      !phoneNumber
    ) {
      return alert("Please provide all fields");
    }
    axios
      .post("http://localhost:3000/service-providers/create-new", {
        firstName,
        lastName,
        storeName,
        email,
        password,
        confirmPassword,
        street,
        city,
        province,
        country,
        phoneNumber,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="service_provider__container">
      <h1 className="service_provider__logo-container">Logo</h1>
      <form className="service_provider__form">
        <div className="service_provider__inputs-container">
          <div className="service_provider__column">
            <div className="service_provider__input">
              <label htmlFor="service_provider__first_name">First Name</label>
              <input
                className="service_provider__input-field"
                id="service_provider__first_name"
                onChange={onFirstNameChanged}
                value={firstName}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__last_name">Last Name</label>
              <input
                className="service_provider__input-field"
                id="service_provider__last_name"
                onChange={onLastNameChanged}
                value={lastName}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__store_name">Store Name</label>
              <input
                className="service_provider__input-field"
                id="service_provider__store_name"
                onChange={onStoreNameChanged}
                value={storeName}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__email">Email</label>
              <input
                className="service_provider__input-field"
                id="service_provider__email"
                onChange={onEmailChanged}
                value={email}
                type="email"
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__password">Password</label>
              <input
                className="service_provider__input-field"
                id="service_provider__password"
                onChange={onPasswordChanged}
                value={password}
                type="password"
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__confirm-password">
                Confirm Password
              </label>
              <input
                className="service_provider__input-field"
                id="service_provider__confirm-password"
                onChange={onConfirmPasswordChanged}
                value={confirmPassword}
                type="password"
              />
            </div>
          </div>
          <div className="service_provider__column">
            <div className="service_provider__input">
              <label htmlFor="service_provider__street">Street</label>
              <input
                className="service_provider__input-field"
                id="service_provider__street"
                onChange={onStreetChanged}
                value={street}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__city">City</label>
              <input
                className="service_provider__input-field"
                id="service_provider__city"
                onChange={onCityChanged}
                value={city}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__city">Province</label>
              <input
                className="service_provider__input-field"
                id="service_provider__province"
                onChange={onProvinceChanged}
                value={province}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__country">Country</label>
              <input
                className="service_provider__input-field"
                id="service_provider__country"
                onChange={onCountryChanged}
                value={country}
              />
            </div>

            <div className="service_provider__input">
              <label htmlFor="service_provider__phone-number">
                Phone Number
              </label>
              <input
                className="service_provider__input-field"
                id="service_provider__phone-number"
                onChange={onPhoneNumberChanged}
                value={phoneNumber}
                type="number"
              />
            </div>

            <p>I agree with terms and conditions</p>
            <button onClick={handleSubmit}>Sign Up</button>
            <button>
              <Link to="/service-provider-login">Login</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
