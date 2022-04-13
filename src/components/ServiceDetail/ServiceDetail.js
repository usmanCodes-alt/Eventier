import React from "react"
import { useState, useEffect, useContext } from "react";
import  Image1  from "./image1.png";

import "./ServiceDetail.css";


export default function OrderDetail() {
  const initialValues = {
    service_name: "hall no 1",//
    service_type: "hall",//
    unit_price: "25000",//
    status: "active",//
    description: "this is mall no 1",//
    discount: "0",//
    first_name: "Expo",//
    last_name: "center services",//
    email: "dfasasddf@dasd",
    phone_number: "123456",
  };
  
 
  
  const [formValues, setFormValues] = useState(initialValues);
  return (
    <div className="container-fluid Servicedetail">
    <div className="row">
      <div className=" col-lg-11 col-md-11 col-sm-1    ">
        <h1>Order Detail</h1>
        <div className="row">
          <div className=" col-lg-7 col-md-7 col-sm-7 servicedetailcardLeft  ">
            <h4>Service Information</h4>
            <div>
            <img src={Image1}    />
              <label   > &nbsp;&nbsp;&nbsp;{formValues.service_name}</label>
            </div>
            <div className="detail_service">
              <label className="label_service_information">Service Type :&nbsp; </label>
              <label >{formValues.customer_fname}  &nbsp; {formValues.service_type}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Unit Price : &nbsp; </label>
              <label >{formValues.unit_price}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Status : &nbsp; </label>
              <label >{formValues.status} &nbsp; </label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Description : &nbsp; </label>
              <label >{formValues.description}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Name : &nbsp; </label>
              <label >{formValues.first_name} &nbsp; {formValues.last_name}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Email : &nbsp; </label>
              <label >{formValues.email}</label>
            </div>
            <div className="detail_order">
              <label className="label_order_information">Phone Number : &nbsp; </label>
              <label >{formValues.phone_number}</label>
            </div>

            


          </div>
          <div className=" col-lg-4 col-md-4 col-sm-4    ">
            <div className="row servicedetailcardRight">
              <label className="label_order_information">Service Images</label>
              <div>
              
              </div>
              
            </div>
            <div className="row servicedetailcardRight">
            <label className="label_order_information">Rating and Reviews</label>
              <div>
              
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
  