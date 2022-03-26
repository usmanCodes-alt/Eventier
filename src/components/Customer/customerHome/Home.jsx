import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../../context/auth-context";

import Search from "../searchServiceBar/Search";
import Card from "../../card/Card";
import Header from "../customerHeader/Header";

import "./home.css";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const [services, setServices] = useState([]);

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
        setServices(services);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (services.length === 0) {
    return <h1>NO Service providers active at the moment!</h1>;
  } else {
    return (
      <React.Fragment>
        <Header />
        <Search />
        <div className="home__services-wrapper">
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
