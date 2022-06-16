import React from "react";
import { useState, useEffect } from "react";
import "./DashBoard.css";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import AddServiceImage from "../../../images/add_service_button.png";

import EmptyOrdersImage from "../../../images/no orders.webp";
import Header from "../Header/Header";

import StarRatings from "react-star-ratings";
import NoOrderImage from "../../../images/no-orders.webp";
import NoReviewsImage from "../../../images/no-reviews.png";

export default function DashBoard() {
  const [orders, setOrders] = useState([]);
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]);

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

    axios
      .get(
        "http://localhost:3000/service-provider/get-all-ratings-and-reviews",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setRatingsAndReviews(res.data.allReviews);
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
    <React.Fragment>
      <Header />
      <div className="sp__dashboard-container">
        {orders.length === 0 ? (
          <div className="sp__dashboard-no-order-img-wrapper">
            <img
              className="sp__dashboard-no-order-img"
              src={EmptyOrdersImage}
              alt="No Orders"
            />
            <h4>You do not have any orders yet! :(</h4>
          </div>
        ) : (
          <div className="sp__dashboard-pie-charts-container">
            <div className="sp__dashboard-pri-chart-content">
              <PieChart
                className="sp__dashboard-pie-chart"
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
                lineWidth="30"
                animate={true}
                totalValue={orders.length}
              />
              <h6 className="sp__dashboard-chart-label">In-Progress Orders</h6>
            </div>

            <div className="sp__dashboard-pri-chart-content">
              <PieChart
                className="sp__dashboard-pie-chart"
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
                lineWidth="30"
                animate={true}
                totalValue={orders.length}
              />
              <h6 className="sp__dashboard-chart-label">Delivered Orders</h6>
            </div>

            <div className="sp__dashboard-pri-chart-content">
              <PieChart
                className="sp__dashboard-pie-chart"
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
                lineWidth="30"
                animate={true}
                totalValue={orders.length}
              />
              <h6 className="sp__dashboard-chart-label">Accepted Orders</h6>
            </div>
            <div className="sp__dashboard-pri-chart-content">
              <PieChart
                className="sp__dashboard-pie-chart"
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
                lineWidth="30"
                animate={true}
                totalValue={orders.length}
              />
              <h6 className="sp__dashboard-chart-label">Rejected Orders</h6>
            </div>
          </div>
        )}

        <div className="sp__dashboard-orders-reviews-add_service-container">
          <div className="sp__dashboard-recent-order-container">
            <h4>Recent orders</h4>
            {orders.length !== 0 ? (
              <ul className="sp__dashboard-recent-orders-list">
                {orders
                  .slice(-5)
                  .reverse()
                  .map((order) => (
                    <li
                      key={order.order_id}
                      className="sp__dashboard-recent-orders-li"
                    >
                      {order.order_name} {order.customer_name}{" "}
                      {order.service_type}
                    </li>
                  ))}
              </ul>
            ) : (
              // <h5>No recent orders.</h5>
              <img
                className="sp__dashboard-no-recent-orders-img"
                src={NoOrderImage}
                alt="No Orders"
              />
            )}
          </div>
          <div className="sp__dashboard-reviews-container">
            <h4 className="sp__dashboard-reviews-heading">Reviews</h4>
            {ratingsAndReviews.length !== 0 ? (
              ratingsAndReviews
                .slice(-5)
                .reverse()
                .map((ratingAndReview) => {
                  return (
                    <div className="sp__dashboard-single-rating-review-wrapper">
                      <div className="sp__dashboard-user-name">
                        <p>{ratingAndReview.first_name}</p>
                      </div>
                      <div className="sp__dashboard-user-review">
                        <p className="sp__dashboard-user-review-text">
                          "{ratingAndReview.review_message}"
                        </p>
                      </div>
                      <div className="sp__dashboard-user-rating">
                        <StarRatings
                          numberOfStars={ratingAndReview.star_rating}
                          starDimension="25px"
                          starEmptyColor="orange"
                          starSpacing="0"
                        />
                      </div>
                    </div>
                  );
                })
            ) : (
              <img
                className="sp__dashboard-no-recent-reviews-img"
                src={NoReviewsImage}
                alt="No Reviews"
              />
            )}
          </div>
          <div className="sp__dashboard-add-service-container">
            <h4>Add service</h4>
            <Link to="/service-provider/add-service">
              <img
                className="sp__dashboard-add-service-image"
                src={AddServiceImage}
                alt="Add Service"
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
