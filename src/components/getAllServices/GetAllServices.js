import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/auth-context.js";
import styles from "./GetAllServices.css";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Alert } from "bootstrap";

export default function TotalOrders() {
  const [services, setServices] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    console.log("Submit");
  };

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  useEffect(() => {
    const bearerToken = localStorage.getItem("auth_token");
    axios
      .get("http://localhost:3000/service-providers/get-services", {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        setServices(response.data.servicesRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid GelAllServices ">
      <div className="maincardServices">
        <h1>Services</h1>

        <div className="row ">
          {/* <div className=" col-lg-1 col-md-1 col-sm-1"></div> */}

          <div className=" col-lg-4 col-md-4 col-sm-4 cardServices ">
            <div
              className="btn-toolbar justify-content-between titleServices"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Name</h3>
              </div>
            </div>
            <ul className="list-group">
              {services.map((service) => {
                return (
                  <li className="list-group-item">{service.service_name}</li>
                );
              })}
            </ul>
          </div>
          <div className=" col-lg-4 col-md-4 col-sm-4 cardServices   ">
            <div
              className="btn-toolbar justify-content-between titleServices"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Service Type</h3>
              </div>
            </div>
            <ul className="list-group">
              {services.map((service) => {
                return (
                  <li className="list-group-item">{service.service_type}</li>
                );
              })}
            </ul>
          </div>
          <div className=" col-lg-4 col-md-4 col-sm-4 cardServices   ">
            <div
              className="btn-toolbar justify-content-between titleServices"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Price</h3>
              </div>
            </div>
            <ul className="list-group">
              {services.map((service) => {
                return (
                  <li className="list-group-item">{service.unit_price}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
