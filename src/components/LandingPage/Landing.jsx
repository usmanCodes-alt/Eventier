import React, { useState, useEffect } from "react";

import axios from "axios";
import Header from "./LandingHeader/Header";
import Card from "../card/Card";

import "./landing.css";

export default function LandingPage() {
  const [mostOrderedServices, setMostOrderedServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get-most-ordered")
      .then((res) => {
        // console.log(res);
        setMostOrderedServices(res.data.services);
      })
      .catch((err) => console.log(err));
  }, []);

  const mapMostOrderedServices = (services) =>
    mostOrderedServices.map((service) => (
      <Card
        url={service.static_url}
        serviceName={service.service_name}
        description={service.description}
        serviceId={service.service_database_id}
      />
    ));

  return (
    <React.Fragment>
      <Header />
      <div className="landing-page__container">
        <div className="landing-page__hero-banner-container">
          <div className="landing-page__intro-container">
            <h3 className="landing-page__app-name">Eventier</h3>
            <p className="landing-page__welcome-text">
              Welcome to our App! The services management store that helps you
              connect to multiple service providers with ease.
            </p>
          </div>
        </div>
        <div className="landing-page__most-ordered-container">
          <h3 className="landing-page__most-ordered-text">Most Ordered</h3>
          <div className="landing-page__most-sold-products">
            {mapMostOrderedServices()}
          </div>
        </div>
        <div className="landing-page__about-us-container">
          <h3 className="landing-page__about-us-text">About Us</h3>
          <h6 className="landing-page__about-us">
            Welcome to Eventier, your number one source for all things
            (services). We're dedicated to giving you the very best of those,
            with a focus on dependability, customer service and other users
            sentiments. We hope you enjoy our products as much as we enjoy
            offering them to you. If you have any questions or comments, please
            don't hesitate to contact us.
            <br />
            <br />
            Sincerely, Our Team.
          </h6>
        </div>
      </div>
    </React.Fragment>
  );
}
