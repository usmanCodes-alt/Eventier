import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/auth-context";
import "./TotalOrders.css";
import Header from "../Header/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

import "react-dropdown/style.css";

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

  const handleSubmit = (status) => {
    setSpecificOrders(() => {
      return orders.filter((order) => order.status === status);
    });
    setOrderStatus(status);
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

  const changeOrderStatus = (statusValue, orderId) => {
    if (statusValue === "--") {
      console.log(statusValue);
      return;
    }
    axios
      .patch(
        "http://localhost:3000/service-providers/update-order-status",
        {
          newStatus: statusValue,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("changing state");
          setOrders((oldOrders) => {
            // change status of order
            return oldOrders.map((order) => {
              if (order.order_id === orderId) {
                order.status = statusValue;
              }
              return order;
            });
          });

          setSpecificOrders((oldOrders) => {
            // change status of order
            return oldOrders.map((order) => {
              if (order.order_id === orderId) {
                order.status = statusValue;
              }
              return order;
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const renderSelectOptions = (order) => {
    // return (
    //   <select
    //     name="status"
    //     onChange={(e) => changeOrderStatus(e.target.value, order.order_id)}
    //     value={order.status}
    //   >
    //     <option>--</option>
    //     <option value="accepted">Accept</option>
    //     <option value="in-progress">In-Progress</option>
    //     <option value="delivered">Delivered</option>
    //     <option value="rejected">Reject</option>
    //   </select>
    // );
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order.status}
          label="Status"
          onChange={(e) => changeOrderStatus(e.target.value, order.order_id)}
        >
          <MenuItem value="--">--</MenuItem>
          <MenuItem value="accepted">Accept</MenuItem>
          <MenuItem value="in-progress">In-Progress</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="rejected">Reject</MenuItem>
        </Select>
      </FormControl>
    );
  };

  const renderRow = (order) => {
    return (
      <tr className="totalOrder_tbodyRow">
        <td className="totalOrders__tbodyRowCell">{order.order_name}</td>
        <td className="totalOrders__tbodyRowCell">{order.customer_name}</td>
        <td className="totalOrders__tbodyRowCell">
          {formatDate(order.order_date)}
        </td>
        <td className="totalOrders__tbodyRowCell">{order.service_type}</td>
        <td className="totalOrders__tbodyRowCell">{order.payment_status}</td>
        <td className="totalOrders__tbodyRowCell">
          {renderSelectOptions(order)}
        </td>
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
            <th className="totalOrders__theadCells">Customer Name</th>
            <th className="totalOrders__theadCells">Order Date</th>
            <th className="totalOrders__theadCells">Service Type</th>
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
