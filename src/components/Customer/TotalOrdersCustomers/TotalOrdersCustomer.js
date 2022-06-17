import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/auth-context";
import "./TotalOrdersCustomer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../customerHeader/Header";

export default function TotalOrdersCustomer() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [specificOrders, setSpecificOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Total Orders");

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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

  const handleSubmit = (status) => {
    setSpecificOrders(() => {
      return orders.filter((order) => order.orderStatus === status);
    });
    setOrderStatus(status);
  };

  useEffect(() => {
    console.log(specificOrders);
  }, [specificOrders]);

  useEffect(() => {
    // let apiUrl = "";
    const bearerToken = localStorage.getItem("auth_token");
    axios
      .get("http://localhost:3000/customers/get-orders", {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        console.log(response);
        setOrders(response.data.CUSTOMER_ORDERS);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderRow = (order) => {
    return (
      <tr className="totalOrder_tbodyRow" style={{ cursor: "pointer" }}>
        <td className="totalOrders__tbodyRowCell">{order.orderName}</td>
        <td className="totalOrders__tbodyRowCell">
          {order.serviceProviderStoreName}
        </td>
        <td className="totalOrders__tbodyRowCell">
          {formatDate(order.orderDate)}
        </td>
        <td className="totalOrders__tbodyRowCell">{order.paymentStatus}</td>
        <td className="totalOrders__tbodyRowCell">{order.orderStatus}</td>
      </tr>
    );
  };

  return (
    <div className="totalOrders__wrapper">
      <Header />
      <div className="totalOrders__filterOptionsContainer">
        <div
          className="totalOrders__filterOptions"
          onClick={handleSubmit.bind(this, "Total Orders")}
        >
          All Orders
        </div>
        <div
          className="totalOrders__filterOptions"
          onClick={handleSubmit.bind(this, "in-progress")}
        >
          In-Progress
        </div>
        <div
          className="totalOrders__filterOptions"
          onClick={handleSubmit.bind(this, "delivered")}
        >
          Delivered
        </div>
        <div
          className="totalOrders__filterOptions"
          onClick={handleSubmit.bind(this, "accepted")}
        >
          Accepted
        </div>
        <div
          className="totalOrders__filterOptions"
          onClick={handleSubmit.bind(this, "rejected")}
        >
          Rejected
        </div>
      </div>

      <table className="totalOrders__orderTable">
        <thead className="totalOrders__thead">
          <tr>
            <th className="totalOrders__theadCells first">Order Name</th>
            <th className="totalOrders__theadCells">Store Name</th>
            <th className="totalOrders__theadCells">Order Date</th>
            <th className="totalOrders__theadCells">Payment Status</th>
            <th className="totalOrders__theadCells last">Order Status</th>
          </tr>
        </thead>

        <tbody>
          {orderStatus === "Total Orders"
            ? orders.map((order) => {
                return renderRow(order);
              })
            : specificOrders.map((order) => {
                return renderRow(order);
              })}
        </tbody>
      </table>
    </div>
  );
}
