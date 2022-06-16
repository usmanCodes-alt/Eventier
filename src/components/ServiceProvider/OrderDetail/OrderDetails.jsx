import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Header/Header";
import DetailsRow from "./DetailsRow";

import "./order-details.css";

export default function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders/" + location.state.orderId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        console.log(res);
        setOrder(res.data.orderDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="orderDetails__container">
      <Header />
      <div className="orderDetails__back-arrow-wrapper">
        <ArrowBackIcon
          className="customerLogin__back-arrow"
          onClick={() => navigate("/service-provider/total-orders")}
        />
        <p>All Orders</p>
      </div>
      <div className="orderDetails__order-details-container">
        <h5 className="orderDetails__order-details-section-heading">
          Customer Details
        </h5>
        <DetailsRow
          informationText={"Customer First Name"}
          value={order.customer_fname}
        />
        <DetailsRow
          informationText={"Customer Last Name"}
          value={order.customer_lname}
        />
        <DetailsRow
          informationText={"Customer Email"}
          value={order.customer_email}
        />
        <DetailsRow
          informationText={"Customer Phone Number"}
          value={order.customer_phone}
          last={true}
        />

        <h5 className="orderDetails__order-details-section-heading">
          Order Information
        </h5>
        <DetailsRow informationText={"Order Name"} value={order.order_name} />
        <DetailsRow
          informationText={"Order Status"}
          value={
            order.order_status === null ? "Action required" : order.order_status
          }
        />
        <DetailsRow
          informationText={"Order Payment Status"}
          value={order.payment_status}
          last={true}
        />

        <h5 className="orderDetails__order-details-section-heading">
          Delivery Address
        </h5>
        <DetailsRow informationText={"Area"} value={order.street} />
        <DetailsRow informationText={"City"} value={order.city} />
        <DetailsRow informationText={"Province"} value={order.province} />
        <DetailsRow
          informationText={"Country"}
          value={order.country}
          last={true}
        />

        <h5 className="orderDetails__order-details-section-heading">
          Service Provider Information
        </h5>
        <DetailsRow
          informationText={"Service Provider Email"}
          value={order.service_provider_email}
        />
      </div>
    </div>
  );
}
