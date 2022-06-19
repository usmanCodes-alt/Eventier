import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../customerHeader/Header";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "./WishList.css";

export default function WishList() {
  const [wishList, setWishList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

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
    setShowLoading(true);
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
        setShowLoading(false);
        if (res.status === 200) {
          getItemsFromWishList();
        }
      })
      .catch((err) => {
        setShowLoading(false);
        console.log(err);
      });
  };

  const navigateToServiceDetails = (serviceId) => {
    navigate("/customer/service-details", {
      state: {
        serviceId,
      },
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
              <tr
                className="cart__tbodyRow"
                key={item.wish_list_id}
                onClick={navigateToServiceDetails.bind(this, item.service_id)}
              >
                <td className="cart__tbody-cells">{item.service_name}</td>
                <td className="cart__tbody-cells">{item.service_type}</td>
                <td className="cart__tbody-cells">{item.unit_price}</td>
                <td className="cart__tbody-cells">
                  {item.service_provider_email}
                </td>
                <td className="cart__tbody-cells">
                  <DeleteIcon
                    className="cart__delete-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveButtonClicked(item.wish_list_id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
