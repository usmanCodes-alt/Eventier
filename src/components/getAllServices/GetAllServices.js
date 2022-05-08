import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/auth-context.js";
import Card from "../card/Card.js";
import styles from "./GetAllServices.css";
import axios from "axios";
import Header from "../Header/Header.js";
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
        console.log(response.data.servicesRows);
        setServices(response.data.servicesRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (services.length === 0) {
    return (
      <React.Fragment>
        <Header />
        <h1>You don't have any services</h1>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header />
        <div className="all_services__wrapper">
          {services.map((service) => {
            return (
              <Card
                url={service.static_url}
                serviceName={service.service_name}
                description={service.description}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
