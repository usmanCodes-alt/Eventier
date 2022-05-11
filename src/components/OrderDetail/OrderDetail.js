import React from "react"
import { useState, useEffect, useContext } from "react";
import  Image1  from "./image1.png";
import  Image2  from "./image2.png";
import  Image3  from "./image3.png";
import "./OrderDetail.css";


export default function OrderDetail() {
  const initialValues = {
    order_name: "hall",//
    payment_status: "unpaid",//
    order_status: "null",//
    customer_fname: "jake",//
    customer_lname: "don",//
    customer_email: "hondoe@sdashd",
    service_provider_fname: "expo",//
    service_provider_lname: "center services",//
    service_provider_email: "dfasasddf@dasd",//
    service_provider_phone: "123456",//
  };
  
 
  
  const [formValues, setFormValues] = useState(initialValues);
  return (
    <div className="container-fluid Orderdetail">
    <div className="row">
      <div className=" col-lg-11 col-md-11 col-sm-11   ">
        <h1>Order Detail</h1>
        <div className="row">
          <div className=" col-lg-7 col-md-7 col-sm-7 orderdetailcardLeft  ">
            <h4>Service Information</h4>
            <div>
            <img src={Image1}    />
              <label   > &nbsp;&nbsp;&nbsp;{formValues.order_name}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Customer Name :&nbsp; </label>
              <label >{formValues.customer_fname}  &nbsp; {formValues.customer_lname}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Payment_status : &nbsp; </label>
              <label >{formValues.payment_status}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Service Provider Name : &nbsp; </label>
              <label >{formValues.service_provider_fname} &nbsp; {formValues.service_provider_lname}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Service Provider Email : &nbsp; </label>
              <label >{formValues.service_provider_email}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Service Provider PNo : &nbsp; </label>
              <label >{formValues.service_provider_phone}</label>
            </div>
          

            


          </div>
          <div className=" col-lg-4 col-md-4 col-sm-4    ">
            <div className="row orderdetailcardRight">
              <label className="label_order_information">Order Status</label>
              <div>
              <img src={Image2}    />
              </div>
              <div className="status_order">
                <label className="label_order_information">Order Status : &nbsp; </label>
                <label >{formValues.order_status}</label>
              </div>
            </div>
            <div className="row orderdetailcardRight">
            <label className="label_order_information">Customer information</label>
              <div>
              <img src={Image3}    />
              </div>
              <div className="status_order">
                <label className="label_order_information">Name : &nbsp; </label>
                <label >{formValues.customer_fname} &nbsp; {formValues.customer_lname}  </label>
              </div>
              <div className="status_order">
                <label className="label_order_information">Email : &nbsp; </label>
                <label >{formValues.customer_email} </label>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
  