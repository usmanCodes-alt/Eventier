import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../customerHeader/Header";

import DeleteIcon from "@mui/icons-material/Delete";

import "./WishList.css";

export default function WishList() {
  const [wishList, setWishList] = useState([]);

  const getItemsFromWishList = () => {
    axios
      .get("http://localhost:3000/customers/get-wish-list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setWishList(res.data.wishList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemsFromWishList();
  }, []);

  const onRemoveButtonClicked = (wishListId) => {
    axios
      .delete(
        "http://localhost:3000/customers/wish-list/remove/" + wishListId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          getItemsFromWishList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cart__container">
      <Header />
      <table className="cart__table">
        <thead>
          <tr>
            <th className="cart__thead-cells first">Service Name</th>
            <th className="cart__thead-cells">Service Type</th>
            <th className="cart__thead-cells">Unit Price</th>
            <th className="cart__thead-cells">Service Provider Email</th>
            <th className="cart__thead-cells last">Remove from wish list</th>
          </tr>
        </thead>

        <tbody>
          {wishList.map((item) => {
            return (
              <tr className="cart__tbodyRow" key={item.wish_list_id}>
                <td className="cart__tbody-cells">{item.service_name}</td>
                <td className="cart__tbody-cells">{item.service_type}</td>
                <td className="cart__tbody-cells">{item.unit_price}</td>
                <td className="cart__tbody-cells">
                  {item.service_provider_email}
                </td>
                <td className="cart__tbody-cells">
                  <DeleteIcon
                    className="cart__delete-icon"
                    onClick={onRemoveButtonClicked.bind(
                      this,
                      item.wish_list_id
                    )}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
