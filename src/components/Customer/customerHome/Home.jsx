import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import Search from "../searchServiceBar/Search";
import Card from "../../card/Card";
import Header from "../customerHeader/Header";

import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [showSelectedServices, setShowSelectedServices] = useState();

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
    const token = localStorage.getItem("auth_token");
    console.log(token);
    axios
      .get("http://localhost:3000/customers/get-services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const { services } = response.data;
        console.log(services);
        setServices(services);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearchSelected = (value) => {
    console.log(value);
    setShowSelectedServices(value);
  };

  const mapServicesOnHome = (services) =>
    services.map((service) => (
      <Card
        url={service.static_url}
        serviceName={service.service_name}
        description={service.description}
        serviceId={service.service_database_id}
      />
    ));

  if (services.length === 0) {
    return (
      <React.Fragment>
        <Header />
        <p>Please wait..</p>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Header />
        <Search showSelectedServicesOnHome={onSearchSelected} />
        <div className="home__services-wrapper">
          {showSelectedServices
            ? mapServicesOnHome(
                services.filter(
                  (service) => service.service_type === showSelectedServices
                )
              )
            : mapServicesOnHome(services)}
        </div>
      </React.Fragment>
    );
  }
}
