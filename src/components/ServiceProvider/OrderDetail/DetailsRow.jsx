import React from "react";

export default function DetailsRow({ informationText, value, last }) {
  let cssClass = "orderDetails__order-details-row";
  if (last === true) cssClass += " last-row";
  return (
    <div className={cssClass}>
      <h6 className="orderDetails__details-text">{informationText}</h6>
      <h6 className="orderDetails__details-text">{value}</h6>
    </div>
  );
}
