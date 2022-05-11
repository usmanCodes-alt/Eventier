import React from 'react'
import { useState, useEffect, useContext } from "react";
import "./WishList.css";
export default function WishList() {
    const initialValues = {
        ServiceName: "hall",//
        ServiceType: "Rent a Car",//
        UnitPrice: "ten thousand",//
        ServiceProviderEmail: "mfaizanali@gmail.com",//
        
      };
      const [formValues, setFormValues] = useState(initialValues);
  return (
    <div className='container-fluid WishList'>
        <div className='row'>
            <div className='col-lg-11 col-md-11 col-sm-11'>
                <h1>WishList</h1>
                <div className='col-lg-12 col-md-12 col-sm-12 WishListCard'>
                    <div className='row'>
                        <div className='col-lg-2 col-md-2 col-sm-2 WishListTable'>
                        <div className='wishListHeading'>
                            Service Name
                            </div>
                            <div >
                                <li>
                                    {formValues.ServiceName}
                                </li>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-2 WishListTable'>
                        <div className='wishListHeading'>
                            Service Type
                            </div>
                            <div >
                                
                                    {formValues.ServiceType}
                                
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-2 WishListTable'>
                            
                            <div className='wishListHeading'>
                            UnitPrice
                            </div>
                           
                            <div >
                                
                                {formValues.UnitPrice}
                                
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 WishListTable'>
                        <div className='wishListHeading'>
                        Service Provider Email
                            </div>
                            <div >
                               
                                    {formValues.ServiceProviderEmail}
                                
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 WishListTable'>
                        <div className='wishListHeading'>
                       Action
                            </div>
                            <div>
                            <button type="button " class="btn btn-danger buttonWishList">Delete</button>
                            <button type="button" class="btn btn-success">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
