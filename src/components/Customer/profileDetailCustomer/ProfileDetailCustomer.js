import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../../../context/auth-context";
import axios from "axios";

export default function ProfileDetailCustomer() {
  const navigate = useNavigate();
  const passwordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const token = localStorage.getItem("auth_token");
  const { user, setUser } = useContext(UserContext);
  const [userInformation, setUserInformation] = useState({});
  const [staticProfilePictureUrl, setStaticProfilePictureUrl] = useState();
  // profilePicturePlaceHolder
  const [updateMode, setUpdateMode] = useState(false);
  // const [formValues, setFormValues] = useState(initialValues);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setStoreName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [password, setPassword] = useState(passwordValues);
  const profilePictureInputRef = useRef(null);

  const getUserInformationByEmail = () => {
    const userEmail = user?.email || localStorage.getItem("email");
    axios
      .get("http://localhost:3000/service-provider/get-by-email/" + userEmail, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          return console.log("error loading information");
        }
        const { eventierUserInformation } = response.data;
        console.log(eventierUserInformation);
        if (eventierUserInformation.profile_picture_static_url) {
          setStaticProfilePictureUrl(
            "http://localhost:3000/profile-pictures/" +
              eventierUserInformation.email +
              "/" +
              eventierUserInformation.profile_picture_static_url
          );
        }
        setUserInformation({
          first_name: eventierUserInformation.first_name,
          last_name: eventierUserInformation.last_name,
          phone_number: eventierUserInformation.phone_number,
          email: eventierUserInformation.store_name,
          street: eventierUserInformation.street,
          city: eventierUserInformation.city,
          province: eventierUserInformation.province,
          email: eventierUserInformation.email,
          country: eventierUserInformation.country,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      // user is not logged in.
      navigate("/customer-login");
    }

    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  useEffect(() => {
    console.log("running");
    getUserInformationByEmail();
  }, []);

  useEffect(() => {
    setUserFirstName(userInformation.first_name);
    setUserLastName(userInformation.last_name);
    setPhoneNumber(userInformation.phone_number);
    setStoreName(userInformation.email);
    setStreet(userInformation.street);
    setCity(userInformation.city);
    setProvince(userInformation.province);
    setCountry(userInformation.country);
  }, [userInformation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleUpdate = (e) => {
    setUpdateMode(true);
  };

  const handleCancelUpdate = (e) => {
    setUpdateMode(false);
  };

  const sendUpdateApiCall = (e) => {
    e.preventDefault();
    if (
      !userFirstName ||
      !userLastName ||
      !phone_number ||
      !street ||
      !city ||
      !province ||
      !country
    ) {
      return;
    }

    axios
      .patch(
        "http://localhost:3000/service-providers/update-profile",
        {
          first_name: userFirstName,
          last_name: userLastName,
          phone_number: phone_number,
          street: street,
          city: city,
          province: province,
          country: country,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        getUserInformationByEmail();
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onProfilePictureSelect = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("eventierUserEmail", userInformation.email);
    formData.append("sp-profile-picture", e.target.files[0]);
    axios
      .post(
        "http://localhost:3000/service-provider/profile-picture/add",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStaticProfilePictureUrl(
          "http://localhost:3000/profile-pictures/" +
            userInformation.email +
            "/" +
            response.data.filename
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(password);
    setFormErrors(errors);

    // setIsSubmit(true);

    if (Object.keys(errors).length !== 0) {
      return;
    } else {
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
                            <img
                              src={staticProfilePictureUrl}
                              width="100"
                              height="100"
                              className="img-radius"
                              alt="User-Profile"
                              onClick={() =>
                                profilePictureInputRef.current.click()
                              }
                            />
                            <input
                              ref={profilePictureInputRef}
                              type="file"
                              style={{ display: "none" }}
                              accept="image/png, image/jpeg"
                              onChange={onProfilePictureSelect}
                            />
                          </div>

                          {updateMode ? (
                            <React.Fragment>
                              <input
                                value={userFirstName}
                                onChange={(e) =>
                                  setUserFirstName(e.target.value)
                                }
                              />
                              <input
                                value={userLastName}
                                onChange={(e) =>
                                  setUserLastName(e.target.value)
                                }
                              />
                            </React.Fragment>
                          ) : (
                            <h6 className="f-w-600">
                              {userInformation.first_name}{" "}
                              {userInformation.last_name}
                            </h6>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="card-block">
                          <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                            Personal Information
                          </h6>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Email</p>
                              <h6 className="text-muted f-w-400">
                                {userInformation.email}
                              </h6>
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Phone</p>
                              {updateMode ? (
                                <input
                                  value={phone_number}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  required
                                />
                              ) : (
                                <h6 className="text-muted f-w-400">
                                  {userInformation.phone_number}
                                </h6>
                              )}
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Store Name</p>
                              {updateMode ? (
                                <input
                                  value={email}
                                  onChange={(e) => setStoreName(e.target.value)}
                                  required
                                />
                              ) : (
                                <h6 className="text-muted f-w-400">
                                  {userInformation.email}
                                </h6>
                              )}
                            </div>
                          </div>
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                            Address
                          </h6>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Street</p>
                              {updateMode ? (
                                <input
                                  value={street}
                                  onChange={(e) => setStreet(e.target.value)}
                                  required
                                />
                              ) : (
                                <h6 className="text-muted f-w-400">
                                  {userInformation.street}
                                </h6>
                              )}
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">City</p>

                              {updateMode ? (
                                <input
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  required
                                />
                              ) : (
                                <h6 className="text-muted f-w-400">
                                  {userInformation.city}
                                </h6>
                              )}
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Country</p>

                              {updateMode ? (
                                <input
                                  value={country}
                                  onChange={(e) => setCountry(e.target.value)}
                                  required
                                />
                              ) : (
                                <h6 className="text-muted f-w-400">
                                  {userInformation.country}
                                </h6>
                              )}
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Province</p>
                              {updateMode ? (
                                <input
                                  value={province}
                                  onChange={(e) => setProvince(e.target.value)}
                                  required
                                />
                              ) : (
                                <h6 className="text-muted f-w-400">
                                  {userInformation.province}
                                </h6>
                              )}
                            </div>
                            {!updateMode && (
                              <button
                                type="button"
                                className="btn btn-dark btndetail"
                                onClick={handleUpdate}
                              >
                                Update
                              </button>
                            )}
                            {updateMode && (
                              <React.Fragment>
                                <button
                                  type="button"
                                  className="btn btn-dark btndetail"
                                  onClick={sendUpdateApiCall}
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark btndetail"
                                  onClick={handleCancelUpdate}
                                >
                                  Cancel
                                </button>
                              </React.Fragment>
                            )}
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

        <div className="col-lg-4 col-md-4 col-sm-4 cardleftMost">
          <h1>Change Password</h1>

          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            name="oldpass"
            placeholder="Old Password"
            value={password.oldPassword}
            onChange={handleChange}
          />
          <p>{formErrors.oldpass}</p>

          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            name="newpass"
            placeholder="New Password"
            value={password.newPassword}
            onChange={handleChange}
          />
          <p>{formErrors.newpass}</p>

          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            name="cnfrmpass"
            placeholder="Confirm New Password"
            value={password.confirmPassword}
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
