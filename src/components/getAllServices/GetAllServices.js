import React from "react";
import { useState, useEffect } from "react";
import styles from "./GetAllServices.css";
import axios from "axios";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Alert } from "bootstrap";

export default function TotalOrders() {
<<<<<<< HEAD

const [Services, setservices] = useState();




const handleSubmit = (e) => {
console.log("Submit")

};
return (
<div className="container-fluid GelAllServices ">
    <div className='maincardServices'>
        <h1>Services</h1>
        <div className='row barServices'>
            <div className=" col-lg-1 col-md-1 col-sm-1"></div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
                <button type="button" className=" buttonservices" onClick={handleSubmit}>Total Services</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
                <button type="button" className=" buttonservices" onClick={handleSubmit}>Inprogress</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
                <button type="button" className=" buttonservices" onClick={handleSubmit}>Dilivered</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
                <button type="button" className=" buttonservices" onClick={handleSubmit}>Accepted</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
                <button type="button" className=" buttonservices" onClick={handleSubmit}>Rejected</button>
            </div>




        </div>
        <div className="row ">
            {/* <div className=" col-lg-1 col-md-1 col-sm-1"></div> */}

            <div className=" col-lg-4 col-md-4 col-sm-4 cardServices ">
                <div className="btn-toolbar justify-content-between titleServices" role="toolbar"
                    aria-label="Toolbar with button groups">
                    <div className="btn-group " role="group" aria-label="First group">
                        <h3>Name</h3>
                    </div>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>

                </ul>
            </div>
            <div className=" col-lg-4 col-md-4 col-sm-4 cardServices   ">
                <div className="btn-toolbar justify-content-between titleServices" role="toolbar"
                    aria-label="Toolbar with button groups">
                    <div className="btn-group " role="group" aria-label="First group">
                        <h3>Service Type</h3>
                    </div>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>

                </ul>
            </div>
            <div className=" col-lg-4 col-md-4 col-sm-4 cardServices   ">
                <div className="btn-toolbar justify-content-between titleServices" role="toolbar"
                    aria-label="Toolbar with button groups">
                    <div className="btn-group " role="group" aria-label="First group">
                        <h3>Price</h3>
                    </div>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Cras justo odio</li>
                </ul>
            </div>
=======
  const [services, setServices] = useState([]);

  const handleSubmit = (e) => {
    console.log("Submit");
  };

  useEffect(() => {
    console.log("sending api request");
    const bearerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudGllclVzZXJFbWFpbCI6InRlc3RpbmdAbWFpbC5jb20iLCJ1c2VyUm9sZXMiOlsic2VydmljZV9wcm92aWRlciJdLCJpYXQiOjE2NDYxNDQ1MDYsImV4cCI6MTY0NjE0ODEwNn0.Ir-UeoDydSZjwvdU1SBtNYCh4yfSIDvXkOawrmYgjt4";
    axios
      .get("http://localhost:3000/service-providers/get-services", {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      })
      .then((response) => {
        setServices(response.data.servicesRows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid GelAllServices ">
      <div className="maincardServices">
        <h1>Services</h1>

        <div className="row ">
          {/* <div className=" col-lg-1 col-md-1 col-sm-1"></div> */}
>>>>>>> bafa8b2d470cbdb9eb0e4b126ea4c70750d9c9bc

          <div className=" col-lg-4 col-md-4 col-sm-4 cardServices ">
            <div
              className="btn-toolbar justify-content-between titleServices"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Name</h3>
              </div>
            </div>
            <ul className="list-group">
              {services.map((service) => {
                return (
                  <li className="list-group-item">{service.service_name}</li>
                );
              })}
            </ul>
          </div>
          <div className=" col-lg-4 col-md-4 col-sm-4 cardServices   ">
            <div
              className="btn-toolbar justify-content-between titleServices"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Service Type</h3>
              </div>
            </div>
            <ul className="list-group">
              {services.map((service) => {
                return (
                  <li className="list-group-item">{service.service_type}</li>
                );
              })}
            </ul>
          </div>
          <div className=" col-lg-4 col-md-4 col-sm-4 cardServices   ">
            <div
              className="btn-toolbar justify-content-between titleServices"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group " role="group" aria-label="First group">
                <h3>Price</h3>
              </div>
            </div>
            <ul className="list-group">
              {services.map((service) => {
                return (
                  <li className="list-group-item">{service.unit_price}</li>
                );
              })}
            </ul>
          </div>
        </div>
<<<<<<< HEAD

    </div>
</div>
)
}
=======
      </div>
    </div>
  );
}
>>>>>>> bafa8b2d470cbdb9eb0e4b126ea4c70750d9c9bc
