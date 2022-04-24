import React from "react";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../../context/auth-context";
import styles from "./TotalOrdersCustomer\.css";
import axios from "axios";

export default function TotalOrdersCustomer() {
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
      <div className="container-fluid TotalOrdersCustomer ">
        <div className="maincardCustomer">
          <h1>Orders</h1>
          
          <div className="row ">
            <div className=" col-lg-1 col-md-1 col-sm-1"></div>
  
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrdersCustomer ">
              <div
                className="btn-toolbar justify-content-between titleordersCustomer"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div className="btn-group " role="group" aria-label="First group">
                  <h3>Store Name</h3>
                </div>
              </div>
              <ul className="list-group">
                {orderStatus === "Total Orders"
                  ? orders.map((order) => {
                      return (
                        <li className="list-group-item">{order.ServiceProviderStoreName}</li>
                      );
                    })
                  : specificOrders.map((order) => {
                      return (
                        <li className="list-group-item">{order.ServiceProviderStoreName}</li>
                      );
                    })}
              </ul>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrdersCustomer   ">
              <div
                className="btn-toolbar justify-content-between titleordersCustomer"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div className="btn-group " role="group" aria-label="First group">
                  <h3>Order Name</h3>
                </div>
              </div>
              <ul className="list-group">
                {orderStatus === "Total Orders"
                  ? orders.map((order) => {
                      return (
                        <li className="list-group-item">
                          {order.orderName}
                        </li>
                      );
                    })
                  : specificOrders.map((order) => {
                      return (
                        <li className="list-group-item">
                          {order.orderName}
                        </li>
                      );
                    })}
              </ul>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrdersCustomer   ">
              <div
                className="btn-toolbar justify-content-between titleordersCustomer"
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
                        <li className="list-group-item">{order.orderDate}</li>
                      );
                    })
                  : specificOrders.map((order) => {
                      return (
                        <li className="list-group-item">{order.orderDate}</li>
                      );
                    })}
              </ul>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrdersCustomer   ">
              <div
                className="btn-toolbar justify-content-between titleordersCustomer"
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
                        <li className="list-group-item">{order.paymentStatus}</li>
                      );
                    })
                  : specificOrders.map((order) => {
                      return (
                        <li className="list-group-item">{order.paymentStatus}</li>
                      );
                    })}
              </ul>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrdersCustomer   ">
              <div
                className="btn-toolbar justify-content-between titleordersCustomer"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group titlorders"
                  role="group"
                  aria-label="First group"
                >
                  <h3>Order Status</h3>
                </div>
              </div>
              <ul className="list-group">
                {orderStatus === "Total Orders"
                  ? orders.map((order) => {
                      return (
                        <li className="list-group-item">{order.orderStatus}</li>
                      );
                    })
                  : specificOrders.map((order) => {
                      return (
                        <li className="list-group-item">{order.orderStatus}</li>
                      );
                    })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}
