import React from "react";
import { useNavigate } from "react-router-dom";

import placeHolderImage from "../../service_image_placeholder.jpg";
import "./card.css";

const Card = ({ url, serviceName, description, serviceId }) => {
  // console.log(serviceId);
  const navigate = useNavigate();

  const onViewButtonClicked = (e) => {
    e.preventDefault();
    navigate("/customer/service-details", {
      state: {
        serviceId,
      },
    });
  };

  return (
    <div className="card">
      <div className="card__body">
        <img
          className="card__image"
          src={url ? url : placeHolderImage}
          alt="service"
        />
        <h2 className="card__title">{serviceName}</h2>
        <p className="card__description">{description}</p>
      </div>
      <button className="card__button" onClick={onViewButtonClicked}>
        View
      </button>
    </div>
  );
};

export default Card;
