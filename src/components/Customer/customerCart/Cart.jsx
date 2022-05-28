import React, { useEffect } from "react";
import { useState, useContext } from "react";
// import stripe from "stripe";
import StripeCheckout from "react-stripe-checkout";
// import { useNavigate } from "react-router-dom";
import CartContext from "../../../context/Cart/cartContext";
import Header from "../customerHeader/Header";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import "./Cart.css";

function Cart() {
  const { cartItems, resetCart, removeFromCart } = useContext(CartContext);
  const [emptyAddressErrorMessage, setEmptyAddressErrorMessage] =
    useState(false);

  const [paymentDone, setPaymentDone] = useState(false);

  const placeOrder = () => {
    axios
      .post(
        "http://localhost:3000/customers/process-payment",
        {
          cartItems,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // empty cart and redirect to home
          resetCart();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          setEmptyAddressErrorMessage(true);
        }
      });
  };

  const makePayment = async (token) => {
    setPaymentDone(true);
    console.log(token);
    axios
      .post(
        "http://localhost:3000/customers/process-payment",
        {
          cartItems,
          token,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      )
      .then((res) => {
        console.log("DONE");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(paymentDone);
    if (paymentDone === false) return;

    console.log("Calling api");
    axios
      .post(
        "http://localhost:3000/customers/place-order",
        {
          cartItems,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // empty cart and redirect to home
          resetCart();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          setEmptyAddressErrorMessage(true);
        }
      });
  }, [paymentDone]);

  const onDeletePresses = (serviceId) => {
    removeFromCart(serviceId);
  };

  return (
    <div className="cart__container">
      <Header />
      {emptyAddressErrorMessage && (
        <div
          className="customerLogin__error-container"
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10px",
          }}
        >
          <div>Please update your profile and provide your address first.</div>
        </div>
      )}
      <table className="cart__table">
        <thead>
          <tr className="totalOrders__thead">
            <th className="cart__thead-cells first">Service Name</th>
            <th className="cart__thead-cells">Service Type</th>
            <th className="cart__thead-cells">Unit price</th>
            <th className="cart__thead-cells">Discount</th>
            <th className="cart__thead-cells">Service Provider Email</th>
            <th className="cart__thead-cells last">Remove from Cart</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr className="cart__tbodyRow">
                <td className="cart__tbody-cells">{item.service_name}</td>
                <td className="cart__tbody-cells">{item.service_type}</td>
                <td className="cart__tbody-cells">{item.unit_price}</td>
                <td className="cart__tbody-cells">{item.discount}</td>
                <td className="cart__tbody-cells">{item.email}</td>
                <td className="cart__tbody-cells">
                  <DeleteIcon
                    className="cart__delete-icon"
                    onClick={onDeletePresses.bind(this, item.serviceId)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot align="left">
          <tr>
            <td className="cart__tfoot-cell">
              Sum: {cartItems.reduce((acc, item) => acc + item.unit_price, 0)}{" "}
              Rs.
            </td>
          </tr>
          {cartItems.length !== 0 && (
            <tr>
              <td className="cart__tfoot-cell place-order-button-container">
                <StripeCheckout
                  stripeKey={process.env.REACT_APP_KEY}
                  token={makePayment}
                  name="Payment"
                  amount={1000 * 100}
                  closed={() => console.log("close")}
                >
                  <Button variant="contained">Place order</Button>
                </StripeCheckout>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
