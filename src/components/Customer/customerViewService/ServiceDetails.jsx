import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";
import CartContext from "../../../context/Cart/cartContext";

import axios from "axios";
import ServiceImageCarousel from "./Carousel/ServiceImageCarousel";
import Header from "../customerHeader/Header";

export default function ServiceDetails() {
  const { addToCart } = useContext(CartContext);
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
        console.log({ ...response.data.service, serviceId });
        setServiceDetails({ ...response.data.service, serviceId });
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

  const addServiceToCart = () => {
    addToCart(serviceDetails);
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
        <bold>Service Provider Name: </bold>
        {serviceDetails.first_name} {serviceDetails.last_name}
      </p>
      <p>
        <bold>Service Type: </bold>
        {serviceDetails.service_type}
      </p>
      <p>
        <bold>Service Name: </bold>
        {serviceDetails.service_name}
      </p>
      <p>
        <bold>Service Provider Email: </bold>
        {serviceDetails.email}
      </p>
      <p>
        <bold>Service Provider Phone Number: </bold>
        {serviceDetails.phone_number}
      </p>
      <p>
        <bold>Service current status: </bold>
        {serviceDetails.status}
      </p>
      <button onClick={onContactClicked}>Contact</button>
      <button onClick={addServiceToCart}>Add to Cart</button>
    </div>
  );
}
