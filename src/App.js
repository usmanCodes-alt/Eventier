import React, { useState } from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import OrderDetail from "./components/ServiceProvider/OrderDetail/OrderDetail";
import ServiceDetail from "./components/ServiceProvider/ServiceDetail/ServiceDetail";

// customer components
import Login from "./components/Customer/customerLogin/Login";
import { default as CustomerSignUp } from "./components/Customer/customerSignUp/SignUp";
import { default as CustomerHome } from "./components/Customer/customerHome/Home";
import CustomerProfile from "./components/Customer/customerProfile/CustomerProfile.jsx";
// import OrderDetailCustomer from "./components/Customer/OrderDetailCustomer/OrderDetailCustomer";
import TotalOrdersCustomer from "./components/Customer/TotalOrdersCustomers/TotalOrdersCustomer";
import { default as CustomerServiceDetailsView } from "./components/Customer/customerViewService/ServiceDetails";
import Cart from "./components/Customer/customerCart/Cart";
import Chat from "./components/Customer/Chat/Chat";
import WishList from "./components/Customer/WishList/WishList";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#36304a",
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  return (
    <ThemeProvider theme={theme}>
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
            <Route path="/customer/profile" element={<CustomerProfile />} />

            {/** SP endpoints */}
            <Route path="/service-provider-login" element={<SigninPage />} />
            <Route path="/service-provider/dashboard" element={<DashBoard />} />
            <Route path="/signupPage" element={<Signup />} />
            <Route
              path="/service-provider/my-services"
              element={<GetAllServices />}
            />
            <Route
              path="/service-provider/total-orders"
              element={<TotalOrders />}
            />
            <Route
              path="/service-provider/profile"
              element={<ProfileDetail />}
            />
            <Route
              path="/service-provider/add-service"
              element={<AddService />}
            />
            <Route
              path="/service-provider/sign-up"
              element={<VendorSignup />}
            />
            <Route
              path="/service-provider/service-details"
              element={<ServiceDetail />}
            />

            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
