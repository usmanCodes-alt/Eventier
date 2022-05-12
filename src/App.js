import React, { useState } from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/ServiceProvider/signupmainpage/Signup.js";
import Footer from "./components/footer/Footer";
import AddService from "./components/ServiceProvider/addService/AddService";
import VendorSignup from "./components/ServiceProvider/signupmainpage/Signup";
import ProfileDetail from "./components/ServiceProvider/profileDetail/ProfileDetail";
import SigninPage from "./components/ServiceProvider/signinPage/SigninPage";
import TotalOrders from "./components/ServiceProvider/totalOrders/TotalOrders";
import GetAllServices from "./components/ServiceProvider/getAllServices/GetAllServices";
import DashBoard from "./components/ServiceProvider/dashBoard/DashBoard";
import UserContext from "./context/auth-context";
import OrderDetail from "./components/ServiceProvider/OrderDetail/OrderDetail";
import ServiceDetail from "./components/ServiceProvider/ServiceDetail/ServiceDetail";

// customer components
import Login from "./components/Customer/customerLogin/Login";
import { default as CustomerSignUp } from "./components/Customer/customerSignUp/SignUp";
import { default as CustomerHome } from "./components/Customer/customerHome/Home";
import ProfileDetailCustomer from "./components/Customer/profileDetailCustomer/ProfileDetailCustomer";
import OrderDetailCustomer from "./components/Customer/OrderDetailCustomer/OrderDetailCustomer";
import TotalOrdersCustomer from "./components/Customer/TotalOrdersCustomers/TotalOrdersCustomer";
import { default as CustomerServiceDetailsView } from "./components/Customer/customerViewService/ServiceDetails";
import Cart from "./components/Customer/customerCart/Cart";
import Chat from "./components/Customer/Chat/Chat";
import WishList from "./components/Customer/WishList/WishList";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        {/*<Header />*/}
        <Routes>
          {/** Customer endpoints */}
          <Route path="/" element={<Login />} />
          <Route path="/customer-signup" element={<CustomerSignUp />} />
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route
            path="/customer/service-details"
            element={<CustomerServiceDetailsView />}
          />
          <Route path="/customer-orders" element={<TotalOrdersCustomer />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/wish-list" element={<WishList />} />

          {/** SP endpoints */}
          <Route path="/service-provider-login" element={<SigninPage />} />
          <Route path="/vendordashboard" element={<DashBoard />} />
          <Route path="/signupPage" element={<Signup />} />
          <Route path="/getAllServices" element={<GetAllServices />} />
          <Route path="/totalOrders" element={<TotalOrders />} />
          <Route path="/profileDetail" element={<ProfileDetail />} />
          <Route path="/addService" element={<AddService />} />
          <Route path="/vendorSignup" element={<VendorSignup />} />
          <Route
            path="/service-provider/service-details"
            element={<ServiceDetail />}
          />

          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
