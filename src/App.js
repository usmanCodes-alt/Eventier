import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/signupmainpage/Signup.js";
import Footer from "./components/footer/Footer";
import AddService from "./components/addService/AddService";
import VendorSignup from "./components/vendorSignup/VendorSignup";
import ProfileDetail from "./components/profileDetail/ProfileDetail";
import SigninPage from "./components/signinPage/SigninPage";
import Header from "./components/Header/Header.js";
import TotalOrders from "./components/totalOrders/TotalOrders";
import GetAllServices from "./components/getAllServices/GetAllServices";
import DashBoard from "./components/dashBoard/DashBoard";
import UserContext from "./context/auth-context";
import Login from "./components/Customer/customerLogin/Login";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import { default as CustomerSignUp } from "./components/Customer/customerSignUp/SignUp";
import { default as CustomerHome } from "./components/Customer/customerHome/Home";
import ProfileDetailCustomer from "./components/Customer/profileDetailCustomer/ProfileDetailCustomer";
import OrderDetailCustomer from "./components/Customer/OrderDetailCustomer/OrderDetailCustomer";
import TotalOrdersCustomer from "./components/Customer/TotalOrdersCustomers/TotalOrdersCustomer";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          

          <Route path="/" element={<TotalOrdersCustomer />} />
          <Route path="/customer-login" element={<Login />} />
          <Route path="/customer-signup" element={<CustomerSignUp />} />
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route path="vendordashboard" element={<DashBoard />} />
          <Route path="signupPage" element={<Signup />} />
          <Route path="getAllServices" element={<GetAllServices />} />
          <Route path="totalOrders" element={<TotalOrders />} />
          <Route path="profileDetail" element={<ProfileDetail />} />
          <Route path="addService" element={<AddService />} />
          <Route path="vendorSignup" element={<VendorSignup />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );    
}

export default App;
