import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";
import CartContext from "../../../context/Cart/cartContext";

import StarRatings from "react-star-ratings";
import axios from "axios";
import ServiceImageCarousel from "./Carousel/ServiceImageCarousel";
import DetailsCard from "../customerServiceDetailsCard/DetailsCard";
import Header from "../customerHeader/Header";

import "./service-details.css";

export default function ServiceDetails() {
  const { addToCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [serviceDetails, setServiceDetails] = useState();
  const [userReview, setUserReview] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [existingWishList, setExistingWishList] = useState([]);
  const [showAddToWishListButton, setShowAddToWishListButton] = useState(true);

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

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const { serviceId } = state;
    axios
      .get("http://localhost:3000/services/" + serviceId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log({ ...response.data.service, serviceId });
        setServiceDetails({ ...response.data.service, serviceId, quantity: 1 });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getWishList = () => {
    axios
      .get("http://localhost:3000/customers/get-wish-list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setExistingWishList(res.data.wishList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWishList();
  }, []);

  useEffect(() => {
    if (!existingWishList) {
      return;
    }
    const alreadyExistsInWishList = existingWishList.some(
      (wishListItem) => wishListItem.service_id === serviceDetails.serviceId
    );

    if (alreadyExistsInWishList) {
      setShowAddToWishListButton(false);
    }
  }, [existingWishList, serviceDetails]);

  const getReviewsOfService = () => {
    axios
      .get("http://localhost:3000/get-reviews/" + serviceDetails.serviceId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!serviceDetails) {
      return;
    }
    getReviewsOfService();
  }, [serviceDetails]);

  const onContactClicked = (e) => {
    e.preventDefault();
    /**
     * also save to database that this customer
     * has now contacted this particular service provider.
     */
    if (serviceDetails.blocked === "1") {
      return;
    }
    navigate(`/chat?new_conversation=true&&sp_email=${serviceDetails.email}`);
  };

  const addServiceToCart = () => {
    if (serviceDetails.status === "active") {
      addToCart(serviceDetails);
    }
  };

  const addServiceToWishList = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/customers/wish-list/add",
        {
          serviceName: serviceDetails.service_name,
          serviceType: serviceDetails.service_type,
          unitPrice: serviceDetails.unit_price,
          serviceId: serviceDetails.serviceId,
          serviceProviderEmail: serviceDetails.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setShowAddToWishListButton(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userReviewChanged = (e) => {
    setUserReview(e.target.value);
  };

  const addUserReview = (e) => {
    e.preventDefault();
    if (!userReview || starRating === 0) {
      return;
    }
    axios
      .post(
        "http://localhost:3000/customers/review",
        {
          reviewMessage: userReview,
          starRating,
          serviceId: serviceDetails.serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setStarRating(0);
          setUserReview("");
          getReviewsOfService();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRatingChanged = (newRating) => {
    setStarRating(newRating);
  };

  if (!serviceDetails) {
    return <h1>Please wait</h1>;
  }
  return (
    <div className="serviceDetails__wrapper">
      <Header />
      <ServiceImageCarousel staticURLs={serviceDetails.static_urls} />
      <div className="serviceDetails__button-actions-container">
        <button onClick={onContactClicked}>Contact</button>
        <button onClick={addServiceToCart}>Add to Cart</button>
        {showAddToWishListButton && (
          <button onClick={addServiceToWishList}>Add to my Wish List</button>
        )}
      </div>
      <div className="serviceDetails__information-container">
        <div className="serviceDetails__information-heading">
          <h1>Service Information</h1>{" "}
          {serviceDetails.blocked === "1" && <div>Service Blocked</div>}
        </div>

        <div className="serviceDetails__all-information">
          <DetailsCard
            serviceName={serviceDetails.service_name}
            serviceType={serviceDetails.service_type}
            serviceProviderEmail={serviceDetails.email}
            phoneNumber={serviceDetails.phone_number}
            serviceStatus={serviceDetails.status}
            serviceProviderName={
              serviceDetails.first_name + " " + serviceDetails.last_name
            }
          />
        </div>
      </div>
      <div className="serviceDetails__comment-section">
        <div className="serviceDetails__commentInput">
          <textarea
            className="serviceDetails__commentTextArea"
            placeholder="Please leave a review"
            onChange={userReviewChanged}
            value={userReview}
          ></textarea>
          <div className="serviceDetails__btnAndStarRating">
            <button onClick={addUserReview}>Add Comment</button>
            <StarRatings
              numberOfStars={5}
              changeRating={onRatingChanged}
              rating={starRating}
              starRatedColor="orange"
              starDimension="25px"
            />
          </div>
        </div>
        <div className="serviceDetails__allReviewsContainer">
          {reviews.map((review) => {
            return (
              <div className="serviceDetails__reviewContainer">
                <p className="serviceDetails__userReview">
                  {review.review_message}
                </p>
                <StarRatings
                  numberOfStars={review.star_rating}
                  starDimension="25px"
                  starEmptyColor="orange"
                  starSpacing="0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
