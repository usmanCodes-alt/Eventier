import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";
import CartContext from "../../../context/Cart/cartContext";
import useInput from "../../../hooks/use-input";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import StarRatings from "react-star-ratings";
import axios from "axios";
import ServiceImageCarousel from "./Carousel/ServiceImageCarousel";
import DetailsCard from "../customerServiceDetailsCard/DetailsCard";
import Header from "../customerHeader/Header";

import "./service-details.css";
import { validateDescription } from "../../../utils/inputs-validators";

export default function ServiceDetails() {
  const { cartItems, addToCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [serviceDetails, setServiceDetails] = useState();
  // const [userReview, setUserReview] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [existingWishList, setExistingWishList] = useState([]);
  const [allowUserToAddDescription, setAllowUserToAddDescription] =
    useState(false);
  const [userHasAddress, setUserHasAddress] = useState(false);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    inputFieldHasError: descriptionInputFieldHasError,
    inputValueChangedHandler: descriptionValueChangeHandler,
    setInputValueForUpdate: setDescriptionValue,
    blurHandler: descriptionBlurHandler,
    resetBlur: resetDescriptionBlur,
  } = useInput(validateDescription);

  const [showAddToWishListButton, setShowAddToWishListButton] = useState(true);
  const [wishListSuccessAlert, setWishListSuccessAlert] = useState(false);
  const [showServiceInActiveErrorAlert, setShowServiceInActiveErrorAlert] =
    useState(false);
  const [showAddedToCartSuccessAlert, setShowAddedToCartSuccessAlert] =
    useState(false);
  const [showUserReviewRecordedAlert, setShowUserReviewRecordedAlert] =
    useState(false);
  const [serviceAlreadyAddedToCartAlert, showServiceAlreadyAddedToCartAlert] =
    useState(false);
  const [
    showInValidRequiredReviewFieldsAlert,
    setShowInValidRequiredReviewFieldsAlert,
  ] = useState(false);

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
        if (response.data.service.allowDescription) {
          setAllowUserToAddDescription(true);
        }
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
    if (!existingWishList || !serviceDetails) {
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
    getLoggedInUser();
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
    const alreadyExists = cartItems.some(
      (element) => element.serviceId === serviceDetails.serviceId
    );
    if (alreadyExists) {
      showServiceAlreadyAddedToCartAlert(true);
      return;
    }
    if (serviceDetails.status === "active") {
      addToCart(serviceDetails);
      setShowAddedToCartSuccessAlert(true);
    } else {
      setShowServiceInActiveErrorAlert(true);
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
          setWishListSuccessAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const userReviewChanged = (e) => {
  //   setUserReview(e.target.value);
  // };

  const addUserReview = (e) => {
    e.preventDefault();
    if (!enteredDescription || starRating === 0) {
      setShowInValidRequiredReviewFieldsAlert(true);
      return;
    }
    axios
      .post(
        "http://localhost:3000/customers/review",
        {
          reviewMessage: enteredDescription,
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
          setDescriptionValue("");
          resetDescriptionBlur();
          getReviewsOfService();
          setShowUserReviewRecordedAlert(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoggedInUser = () => {
    axios
      .get("http://localhost:3000/customers/get-details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        if (
          res.data.hasOwnProperty("street") &&
          res.data.hasOwnProperty("city") &&
          res.data.hasOwnProperty("country") &&
          res.data.hasOwnProperty("province")
        ) {
          setUserHasAddress(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const onRatingChanged = (newRating) => {
    setStarRating(newRating);
  };

  const renderAddToCartButton = () => {
    if (userHasAddress) {
      return (
        <Button variant="outlined" onClick={addServiceToCart}>
          Add to Cart
        </Button>
      );
    } else {
      return (
        <div>
          <span className="inputField__error-message-span">
            Please update your profile and add an appropriate address to make an
            order.
          </span>
        </div>
      );
    }
  };

  if (!serviceDetails) {
    return <h1>Please wait</h1>;
  }
  return (
    <div className="serviceDetails__wrapper">
      <Header />
      {wishListSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setWishListSuccessAlert(false)}
        >
          This service has been added to your wish list!
        </Alert>
      )}
      {showServiceInActiveErrorAlert && (
        <Alert
          severity="error"
          onClose={() => setShowServiceInActiveErrorAlert(false)}
        >
          This service is In-Active at the moment and can not be bought!
        </Alert>
      )}
      {showAddedToCartSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowAddedToCartSuccessAlert(false)}
        >
          This service has been added to your cart!
        </Alert>
      )}
      {showUserReviewRecordedAlert && (
        <Alert
          severity="success"
          onClose={() => setShowUserReviewRecordedAlert(false)}
        >
          Your review has been recorded!
        </Alert>
      )}
      {serviceAlreadyAddedToCartAlert && (
        <Alert
          severity="warning"
          onClose={() => showServiceAlreadyAddedToCartAlert(false)}
        >
          This service has already been added to your cart!
        </Alert>
      )}
      {showInValidRequiredReviewFieldsAlert && (
        <Alert
          severity="error"
          onClose={() => setShowInValidRequiredReviewFieldsAlert(false)}
        >
          Please provide a review and a star rating!
        </Alert>
      )}

      <ServiceImageCarousel staticURLs={serviceDetails.static_urls} />
      <div className="serviceDetails__button-actions-container">
        <Button variant="outlined" onClick={onContactClicked}>
          Contact
        </Button>
        {showAddToWishListButton && (
          <Button variant="outlined" onClick={addServiceToWishList}>
            Add to my Wish List
          </Button>
        )}
        {renderAddToCartButton()}
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
          {allowUserToAddDescription && (
            <React.Fragment>
              <div>
                {descriptionInputFieldHasError && (
                  <div className="inputField__error-message-wrapper">
                    <span className="inputField__error-message-span">
                      Description should contain (1-500) characters.
                    </span>
                  </div>
                )}
                <textarea
                  className="serviceDetails__commentTextArea"
                  placeholder="Please leave a review"
                  onChange={descriptionValueChangeHandler}
                  value={enteredDescription}
                  onBlur={descriptionBlurHandler}
                ></textarea>
                <Button variant="contained" onClick={addUserReview}>
                  Add Comment
                </Button>
              </div>
              <div className="serviceDetails__btnAndStarRating">
                <StarRatings
                  numberOfStars={5}
                  changeRating={onRatingChanged}
                  rating={starRating}
                  starRatedColor="orange"
                  starDimension="25px"
                />
              </div>
            </React.Fragment>
          )}
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
