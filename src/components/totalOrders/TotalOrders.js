import React from 'react'
import { useState, useEffect } from "react";
import styles from "./TotalOrders.css";
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Alert } from 'bootstrap';

export default function TotalOrders() {
    
      const [orders, setorders] = useState();
      

      
    
      const handleSubmit = (e) => {
       console.log("Submit")
        
      };
  return (
    <div className="container-fluid TotalOrders ">
        <div className='maincard'>
            <h1>Orders</h1>
        <div className='row bar'>
            <div className=" col-lg-1 col-md-1 col-sm-1"></div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
            <button type="button" className=" buttonorders" onClick={handleSubmit}>Total Orders</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
            <button type="button" className=" buttonorders" onClick={handleSubmit}>Inprogress</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
            <button type="button" className=" buttonorders" onClick={handleSubmit}>Dilivered</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
            <button type="button" className=" buttonorders" onClick={handleSubmit}>Accepted</button>
            </div>
            <div className=" col-lg-2 col-md-2 col-sm-2">
            <button type="button" className=" buttonorders" onClick={handleSubmit}>Rejected</button>
            </div>
            

        
                            
        </div>
        <div className="row ">
            <div className=" col-lg-1 col-md-1 col-sm-1"></div>
            
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders ">
                <div className="btn-toolbar justify-content-between titleorders" role="toolbar" aria-label="Toolbar with button groups">
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
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
                <div className="btn-toolbar justify-content-between titleorders" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group " role="group" aria-label="First group">
                            <h3>Service Order</h3>
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
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
                <div className="btn-toolbar justify-content-between titleorders" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group " role="group" aria-label="First group">
                        <h3>Total Orders</h3>
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
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
                <div className="btn-toolbar justify-content-between titleorders" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group " role="group" aria-label="First group">
                            <h3>Date Created</h3>
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
            <div className=" col-lg-2 col-md-2 col-sm-2 cardsOrders   ">
                <div className="btn-toolbar justify-content-between titleorders" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group titlorders" role="group" aria-label="First group">
                        <h3>Related to</h3>
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
