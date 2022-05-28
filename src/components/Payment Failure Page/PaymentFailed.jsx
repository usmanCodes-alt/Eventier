import React from "react";
import Header from "../Customer/customerHeader/Header";

import PaymentFailedImage from "../../images/payment-failed.webp";
import "./payment-failed.css";

export default function PaymentFailed() {
  return (
    <React.Fragment>
      <Header />
      <div className="payment-failed__container">
        <img
          className="payment-failed__img"
          src={PaymentFailedImage}
          alt="Payment Failed!"
        />
        <p>Payment was cancelled or failed.</p>
      </div>
    </React.Fragment>
  );
}
