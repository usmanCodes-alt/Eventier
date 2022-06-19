import React from "react";

import "./DetailsCard.css";

const DetailsCard = ({
  serviceName,
  serviceType,
  unitPrice,
  discount,
  serviceProviderEmail,
  phoneNumber,
  serviceStatus,
  serviceProviderName,
}) => {
  // console.log(serviceId);

  return (
    <div className="card">
      <div className="card__body">
        <h4 className="card__title">{serviceName}</h4>
        <p className="card__description">Type: {serviceType}</p>
        <p className="card__description">Price: {unitPrice}</p>
        <p className="card__description">Discount: {discount}</p>
        <p className="card__description">
          Provider Email: {serviceProviderEmail}
        </p>
        <p className="card__description">Provider Phone: {phoneNumber}</p>
        <p className="card__description">
          Service Status:{" "}
          <span className={serviceStatus === "active" ? "green" : "red"}>
            {serviceStatus}
          </span>
        </p>
        <p className="card__description">
          Provider Name: {serviceProviderName}
        </p>
      </div>
    </div>
  );
};

export default DetailsCard;
