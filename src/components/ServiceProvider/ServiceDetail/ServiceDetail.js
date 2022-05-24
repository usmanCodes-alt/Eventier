import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../ServiceProvider/Header/Header";
import Image1 from "./image1.png";

import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { state } = useLocation();
  let { serviceId } = state;
  const [editMode, setEditMode] = useState(false);
  const [serviceInDatabase, setServiceInDatabase] = useState();
  const [editServiceName, setEditServiceName] = useState("");
  const [editServiceDescription, setEditServiceDescription] = useState("");
  const [editServiceUnitPrice, setEditServiceUnitPrice] = useState(0);
  const [editServiceStatus, setEditServiceStatus] = useState();
  const [editDiscount, setEditDiscount] = useState(0);

  const getServiceDetailById = () => {
    axios
      .get(`http://localhost:3000/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setServiceInDatabase(res.data.service);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateService = (e) => {
    e.preventDefault();
    axios
      .patch(
        "http://localhost:3000/service-provider/update-service",
        {
          serviceId,
          serviceName: editServiceName,
          unitPrice: editServiceUnitPrice,
          serviceStatus: editServiceStatus,
          description: editServiceDescription,
          discount: editDiscount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // service has been updated
          getServiceDetailById();
          setEditMode(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getServiceDetailById();
  }, []);

  useEffect(() => {
    if (serviceInDatabase) {
      setEditServiceName(serviceInDatabase.service_name);
      setEditServiceDescription(serviceInDatabase.description);
      setEditServiceStatus(serviceInDatabase.status);
      setEditServiceUnitPrice(serviceInDatabase.unit_price);
      setEditDiscount(serviceInDatabase.discount);
    }
  }, [serviceInDatabase]);

  return (
    <div className="container-fluid Servicedetail">
      <Header />
      {serviceInDatabase ? (
        <div className="row">
          <div className=" col-lg-11 col-md-11 col-sm-1    ">
            <h1>Service Details</h1>
            <div className="row">
              <div className=" col-lg-7 col-md-7 col-sm-7 servicedetailcardLeft  ">
                <h4>Service Information</h4>
                <div>
                  <img src={Image1} />
                  {editMode ? (
                    <input
                      value={editServiceName}
                      onChange={(e) => setEditServiceName(e.target.value)}
                    />
                  ) : (
                    <label>
                      {" "}
                      &nbsp;&nbsp;&nbsp;{serviceInDatabase.service_name}
                    </label>
                  )}
                </div>
                <div className="detail_service"></div>
                <div className="detail_order">
                  <label className="label_order_information">
                    Unit Price : &nbsp;{" "}
                  </label>
                  {editMode ? (
                    <input
                      value={editServiceUnitPrice}
                      onChange={(e) => setEditServiceUnitPrice(e.target.value)}
                    />
                  ) : (
                    <label>{serviceInDatabase.unit_price}</label>
                  )}
                </div>
                <div className="detail_order">
                  <label className="label_order_information">
                    Discount : &nbsp;{" "}
                  </label>
                  {editMode ? (
                    <input
                      value={editDiscount}
                      onChange={(e) => setEditDiscount(e.target.value)}
                    />
                  ) : (
                    <label>{serviceInDatabase.discount}</label>
                  )}
                </div>
                <div className="detail_order">
                  <label className="label_order_information">
                    Status : &nbsp;{" "}
                  </label>
                  {editMode ? (
                    <select
                      name="status"
                      value={editServiceStatus}
                      onChange={(e) => setEditServiceStatus(e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="in-active">In-Active</option>
                    </select>
                  ) : (
                    <label>{serviceInDatabase.status} &nbsp; </label>
                  )}
                </div>
                <div className="detail_order">
                  <label className="label_order_information">
                    Description : &nbsp;{" "}
                  </label>
                  {editMode ? (
                    <input
                      value={editServiceDescription}
                      onChange={(e) =>
                        setEditServiceDescription(e.target.value)
                      }
                    />
                  ) : (
                    <label>{serviceInDatabase.description}</label>
                  )}
                </div>
              </div>
              <div className=" col-lg-4 col-md-4 col-sm-4    ">
                <div className="row servicedetailcardRight">
                  <label className="label_order_information">
                    Service Images
                  </label>
                  <div></div>
                </div>
                <div className="row servicedetailcardRight">
                  <label className="label_order_information">
                    Rating and Reviews
                  </label>
                  <div></div>
                </div>
              </div>
              {!editMode && (
                <button
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Edit Service
                </button>
              )}
              {editMode && <button onClick={updateService}>Update</button>}
              {editMode && (
                <button onClick={() => setEditMode(false)}>Cancel</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Please wait</h1>
        </div>
      )}
    </div>
  );
}
