import React from "react";
import { useState, useEffect } from "react";
import "./DashBoard.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import AddServiceImage from "../../add_service_button.png";

import Header from "../Header/Header";

import StarRatings from "react-star-ratings";

export default function DashBoard() {
  const [orders, setOrders] = useState([]);

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

  const getLengthOfOrders = (orderStatus) => {
    console.log(orderStatus);
    return orders.filter((order) => order.status === orderStatus);
  };

  return (
    <div className="container-fluid MainCardDashboard ">
      <Header />
      <div className="row carddatsboard1 ">
        <div>
          <h1>DashBoard</h1>
        </div>
        <div className="row cardsDashboard row justify-content-md-center">
          <h3>Order Statics</h3>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                {
                  title: "Total Orders",
                  value: orders.length,
                  color: "#c0caca",
                },
                {
                  title: "In-Progress Orders",
                  value: getLengthOfOrders("in-progress").length,
                  color: "#FF0000",
                },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                {
                  title: "Total Orders",
                  value: orders.length,
                  color: "#c0caca",
                },
                {
                  title: "Delivered Orders",
                  value: getLengthOfOrders("delivered").length,
                  color: "#FF0000",
                },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                {
                  title: "Total Orders",
                  value: orders.length,
                  color: "#c0caca",
                },
                {
                  title: "Accepted Orders",
                  value: getLengthOfOrders("accepted").length,
                  color: "#FF0000",
                },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                {
                  title: "Total Orders",
                  value: orders.length,
                  color: "#c0caca",
                },
                {
                  title: "Rejected Orders",
                  value: getLengthOfOrders("rejected").length,
                  color: "#FF0000",
                },
              ]}
            />
          </div>

          <div className="row">
            <div className="  col-lg-1 col-md-1 col-sm-1"></div>
            <div className="  col-lg-1 col-md-1 col-sm-1"></div>

            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>In-Progress Orders</h3>
            </div>
            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>Delivered Orders</h3>
            </div>
            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>Accepted Orders</h3>
            </div>
            <div className=" titlepie col-lg-2 col-md-2 col-sm-2">
              <h3>Rejected Orders</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className=" col-lg-6 col-md-6 col-sm-6 latestOrdersDashBoard">
            <h1>Latest Orders</h1>
            <ul>
              {orders
                .slice(-5)
                .reverse()
                .map((order) => (
                  <li>
                    {order.order_name} {order.customer_name}{" "}
                    {order.service_type}
                  </li>
                ))}
            </ul>
          </div>
          <div className=" col-lg-3 col-md-3 col-sm- ratingsDashboard">
            <h1>Rating and Review</h1>
          </div>
          <div
            style={{ padding: "4px" }}
            className=" col-lg-2 col-md-2 col-sm-2 addserviceDashBoard"
          >
            <Link className="dashboard__add-service-link" to="/addService">
              <img
                height="200px"
                width="200px"
                src={AddServiceImage}
                alt="Add Service"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
