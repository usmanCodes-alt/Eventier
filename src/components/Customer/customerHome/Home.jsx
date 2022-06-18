import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import Search from "../searchServiceBar/Search";
import Card from "../../card/Card";
import Header from "../customerHeader/Header";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [showSelectedServices, setShowSelectedServices] = useState();
  const [showLoading, setShowLoading] = useState(false);

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
    setShowLoading(true);
    axios
      .get("http://localhost:3000/customers/get-services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setShowLoading(false);
        const { services } = response.data;
        console.log(services);
        setServices(services);
      })
      .catch((err) => {
        setShowLoading(false);
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
        key={services.service_database_id}
        url={service.static_url}
        serviceName={service.service_name}
        description={service.description}
        serviceId={service.service_database_id}
      />
    ));

  return (
    <React.Fragment>
      <Header />
      <Search showSelectedServicesOnHome={onSearchSelected} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
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
