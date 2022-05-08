import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import axios from "axios";
import ServiceImageCarousel from "./Carousel/ServiceImageCarousel";
import Header from "../customerHeader/Header";

export default function ServiceDetails() {
  const { user, setUser } = useContext(UserContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [serviceDetails, setServiceDetails] = useState();

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
    const { serviceId } = state;
    axios
      .get("http://localhost:3000/services/" + serviceId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data.service);
        setServiceDetails(response.data.service);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(serviceDetails);

  const onContactClicked = (e) => {
    e.preventDefault();
    /**
     * also save to database that this customer
     * has now contacted this particular service provider.
     */
    console.log(`Navigating to /chat?customerName=${user.email}`);
    navigate(`/chat?new_conversation=true&&sp_email=${serviceDetails.email}`);
  };

  if (!serviceDetails) {
    return <h1>Please wait</h1>;
  }
  return (
    <div>
      <Header />
      <ServiceImageCarousel staticURLs={serviceDetails.static_urls} />
      <h1>Service Information</h1>
      <p>
        <bold>Service Name: </bold>
        {serviceDetails.service_name}
      </p>
      <button onClick={onContactClicked}>Contact</button>
    </div>
  );
}
