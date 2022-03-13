import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/auth-context";
import styles from "./TotalOrders.css";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Alert } from "bootstrap";

export default function TotalOrders() {
  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [specificOrders, setSpecificOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Total Orders");

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  const handleSubmit = (e) => {
    setSpecificOrders(() => {
      return orders.filter((order) => order.status === e.target.value);
    });
    setOrderStatus(e.target.value);
  };

  useEffect(() => {
    const bearerToken = localStorage.getItem("auth_token");
    axios
      .get("http://localhost:3000/service-providers/get-orders", {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        console.log(response);
        setOrders(response.data.serviceProviderOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid TotalOrders ">
      <div className="maincard">
        <h1>Orders</h1>
        <div className="row bar">
          <div className=" col-lg-1 col-md-1 col-sm-1"></div>
          <div className=" col-lg-2 col-md-2 col-sm-2">
            <button
              type="button"
              className=" buttonorders"
              onClick={handleSubmit}
              value="Total Orders"
            >
              Total Orders
            </button>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2">
            <button
              type="button"
              className=" buttonorders"
              onClick={handleSubmit}
              value="in-progress"
            >
              Inprogress
            </button>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2">
            <button
              type="button"
              className=" buttonorders"
              onClick={handleSubmit}
              value="delivered"
            >
              Delivered
            </button>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2">
            <button
              type="button"
              className=" buttonorders"
              onClick={handleSubmit}
              value="accepted"
            >
              Accepted
            </button>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2">
            <button
              type="button"
              className=" buttonorders"
              onClick={handleSubmit}
              value="rejected"
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="row ">
          <div className=" col-lg-1 col-md-1 col-sm-1"></div>

          <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders ">
            <div
              className="btn-toolbar justify-content-between titleorders"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Name</h3>
              </div>
            </div>
            <ul className="list-group">
              {orderStatus === "Total Orders"
                ? orders.map((order) => {
                    return (
                      <li className="list-group-item">{order.order_name}</li>
                    );
                  })
                : specificOrders.map((order) => {
                    return (
                      <li className="list-group-item">{order.order_name}</li>
                    );
                  })}
            </ul>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
            <div
              className="btn-toolbar justify-content-between titleorders"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Payment Status</h3>
              </div>
            </div>
            <ul className="list-group">
              {orderStatus === "Total Orders"
                ? orders.map((order) => {
                    return (
                      <li className="list-group-item">
                        {order.payment_status}
                      </li>
                    );
                  })
                : specificOrders.map((order) => {
                    return (
                      <li className="list-group-item">
                        {order.payment_status}
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
            <div
              className="btn-toolbar justify-content-between titleorders"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Order Date</h3>
              </div>
            </div>
            <ul className="list-group">
              {orderStatus === "Total Orders"
                ? orders.map((order) => {
                    return (
                      <li className="list-group-item">{order.order_date}</li>
                    );
                  })
                : specificOrders.map((order) => {
                    return (
                      <li className="list-group-item">{order.order_date}</li>
                    );
                  })}
            </ul>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
            <div
              className="btn-toolbar justify-content-between titleorders"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Customer Name</h3>
              </div>
            </div>
            <ul className="list-group">
              {orderStatus === "Total Orders"
                ? orders.map((order) => {
                    return (
                      <li className="list-group-item">{order.customer_name}</li>
                    );
                  })
                : specificOrders.map((order) => {
                    return (
                      <li className="list-group-item">{order.customer_name}</li>
                    );
                  })}
            </ul>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
            <div
              className="btn-toolbar justify-content-between titleorders"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group titlorders"
                role="group"
                aria-label="First group"
              >
                <h3>Service Type</h3>
              </div>
            </div>
            <ul className="list-group">
              {orderStatus === "Total Orders"
                ? orders.map((order) => {
                    return (
                      <li className="list-group-item">{order.service_type}</li>
                    );
                  })
                : specificOrders.map((order) => {
                    return (
                      <li className="list-group-item">{order.service_type}</li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
