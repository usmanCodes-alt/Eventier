import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../context/Cart/cartContext";
import Header from "../customerHeader/Header";

import axios from "axios";
import "./Cart.css";

function Cart() {
  const { cartItems, resetCart } = useContext(CartContext);
  const navigate = useNavigate();

  const onPlaceOrderClicked = (e) => {
    e.preventDefault();
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
          //   navigate("/customer-home");
          console.log(res);
          window.location = res.data.STRIPE_URL;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="cart__container">
      <Header />
      <table className="cart__table">
        <thead>
          <tr>
            <th className="cart__thead-cells">Service Name</th>
            <th className="cart__thead-cells">Service Type</th>
            <th className="cart__thead-cells">Unit price</th>
            <th className="cart__thead-cells">Discount</th>
            <th className="cart__thead-cells">Service Provider Email</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td className="cart__tbody-cells">{item.service_name}</td>
                <td className="cart__tbody-cells">{item.service_type}</td>
                <td className="cart__tbody-cells">{item.unit_price}</td>
                <td className="cart__tbody-cells">{item.discount}</td>
                <td className="cart__tbody-cells">{item.email}</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <td className="cart__tfoot-cell">
              Sum: {cartItems.reduce((acc, item) => acc + item.unit_price, 0)}{" "}
              Rs.
            </td>
          </tr>
          <tr>
            <td className="cart__tfoot-cell place-order-button-container">
              <button onClick={onPlaceOrderClicked}>Place order</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
