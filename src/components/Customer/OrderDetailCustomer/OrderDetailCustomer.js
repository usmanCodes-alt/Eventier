import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Image1 from "./image1.png";
import Image2 from "./image2.png";
import Image3 from "./image3.png";
import "./OrderDetailCustomer.css";

export default function OrderDetailCustomer() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      // user is not logged in.
      navigate("/customer-login");
    }
  }, []);

  const initialValues = {
    order_name: "hall", //
    payment_status: "unpaid", //
    order_status: "null", //
    customer_fname: "jake", //
    customer_lname: "don", //
    customer_email: "hondoe@sdashd",
    service_provider_fname: "expo", //
    service_provider_lname: "center services", //
    service_provider_email: "dfasasddf@dasd", //
    service_provider_phone: "123456", //
  };

  const [formValues, setFormValues] = useState(initialValues);
  return (
    <div className="container-fluid OrderdetailCustomer">
      <div className="row">
        <div className=" col-lg-11 col-md-11 col-sm-1    ">
          <h1>Order Detail Customer</h1>
          <div className="row">
            <div className=" col-lg-7 col-md-7 col-sm-7 orderdetailcardLeftCustomer  ">
              <h4>Service Information</h4>
              <div>
                <img src={Image1} />
                <label> &nbsp;&nbsp;&nbsp;{formValues.order_name}</label>
              </div>
              <div className="detail_ordercustomer">
                <label className="label_order_informationcustomer">
                  Customer Name :&nbsp;{" "}
                </label>
                <label>
                  {formValues.customer_fname} &nbsp; {formValues.customer_lname}
                </label>
              </div>
              <div className="detail_ordercustomer">
                <label className="label_order_informationcustomer">
                  Payment_status : &nbsp;{" "}
                </label>
                <label>{formValues.payment_status}</label>
              </div>
              <div className="detail_ordercustomer">
                <label className="label_order_informationcustomer">
                  Service Provider Name : &nbsp;{" "}
                </label>
                <label>
                  {formValues.service_provider_fname} &nbsp;{" "}
                  {formValues.service_provider_lname}
                </label>
              </div>
              <div className="detail_ordercustomer">
                <label className="label_order_informationcustomer">
                  Service Provider Email : &nbsp;{" "}
                </label>
                <label>{formValues.service_provider_email}</label>
              </div>
              <div className="detail_ordercustomer">
                <label className="label_order_informationcustomer">
                  Service Provider PNo : &nbsp;{" "}
                </label>
                <label>{formValues.service_provider_phone}</label>
              </div>
            </div>
            <div className=" col-lg-4 col-md-4 col-sm-4    ">
              <div className="row orderdetailcardRightCustomer">
                <label className="label_order_informationcustomer">
                  Order Status
                </label>
                <div>
                  <img src={Image2} />
                </div>
                <div className="status_ordercustomer">
                  <label className="label_order_informationcustomer">
                    Order Status : &nbsp;{" "}
                  </label>
                  <label>{formValues.order_status}</label>
                </div>
              </div>
              <div className="row orderdetailcardRightCustomer">
                <label className="label_order_informationcustomer">
                  Seller information
                </label>
                <div>
                  <img src={Image3} />
                </div>
                <div className="status_ordercustomer">
                  <label className="label_order_informationcustomer">
                    Name : &nbsp;{" "}
                  </label>
                  <label>
                    {formValues.customer_fname} &nbsp;{" "}
                    {formValues.customer_lname}{" "}
                  </label>
                </div>
                <div className="status_ordercustomer">
                  <label className="label_order_informationcustomer">
                    Email : &nbsp;{" "}
                  </label>
                  <label>{formValues.customer_email} </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
