import React from 'react'
import { useState, useEffect } from "react";
import styles from "./GetAllServices.css";
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Alert } from 'bootstrap';

export default function TotalOrders() {
    
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
                <div className="btn-toolbar justify-content-between titleServices" role="toolbar" aria-label="Toolbar with button groups">
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
                <div className="btn-toolbar justify-content-between titleServices" role="toolbar" aria-label="Toolbar with button groups">
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
                <div className="btn-toolbar justify-content-between titleServices" role="toolbar" aria-label="Toolbar with button groups">
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
            
        </div>

        </div>
    </div>
  )
}
