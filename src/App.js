import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import AddService from "./components/ServiceProvider/addService/AddService";
import VendorSignup from "./components/ServiceProvider/signupmainpage/Signup";
import { default as ServiceProviderProfile } from "./components/ServiceProvider/serviceProviderProfile/Profile";
// import SigninPage from "./components/ServiceProvider/signinPage/SigninPage";
import TotalOrders from "./components/ServiceProvider/totalOrders/TotalOrders";
import GetAllServices from "./components/ServiceProvider/getAllServices/GetAllServices";
import DashBoard from "./components/ServiceProvider/dashBoard/DashBoard";
import UserContext from "./context/auth-context";
// import OrderDetail from "./components/ServiceProvider/OrderDetail/OrderDetail";
import { default as ServiceDetails } from "./components/ServiceProvider/serviceProviderServiceDetails/Details.jsx";

// customer components
import Login from "./components/Login/Login";
import { default as CustomerSignUp } from "./components/Customer/customerSignUp/SignUp";
import { default as CustomerHome } from "./components/Customer/customerHome/Home";
import CustomerProfile from "./components/Customer/customerProfile/CustomerProfile.jsx";
import TotalOrdersCustomer from "./components/Customer/TotalOrdersCustomers/TotalOrdersCustomer";
import { default as CustomerServiceDetailsView } from "./components/Customer/customerViewService/ServiceDetails";
import Cart from "./components/Customer/customerCart/Cart";
import Chat from "./components/Customer/Chat/Chat";
import WishList from "./components/Customer/WishList/WishList";

import Protected from "./components/ProtectedRoute/Protected.js";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { default as EmailInputForResetPassword } from "./components/EmailInput/EmailInput";

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
            <Route
              path="/customer-home"
              element={
                <Protected>
                  <CustomerHome />
                </Protected>
              }
            />
            <Route
              path="/customer/service-details"
              element={
                <Protected>
                  <CustomerServiceDetailsView />
                </Protected>
              }
            />
            <Route
              path="/customer-orders"
              element={
                <Protected>
                  <TotalOrdersCustomer />
                </Protected>
              }
            />
            <Route
              path="/customer/cart"
              element={
                <Protected>
                  <Cart />
                </Protected>
              }
            />
            <Route
              path="/customer/wish-list"
              element={
                <Protected>
                  <WishList />
                </Protected>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <Protected>
                  <CustomerProfile />
                </Protected>
              }
            />

            {/** SP endpoints */}
            {/*<Route path="/service-provider-login" element={<SigninPage />} />*/}
            <Route
              path="/service-provider/dashboard"
              element={
                <Protected>
                  <DashBoard />
                </Protected>
              }
            />
            <Route
              path="/service-provider/my-services"
              element={
                <Protected>
                  <GetAllServices />
                </Protected>
              }
            />
            <Route
              path="/service-provider/total-orders"
              element={
                <Protected>
                  <TotalOrders />
                </Protected>
              }
            />
            <Route
              path="/service-provider/profile"
              element={
                <Protected>
                  <ServiceProviderProfile />
                </Protected>
              }
            />
            <Route
              path="/service-provider/add-service"
              element={
                <Protected>
                  <AddService />
                </Protected>
              }
            />
            <Route
              path="/service-provider/sign-up"
              element={<VendorSignup />}
            />
            <Route
              path="/service-provider/service-details"
              element={
                <Protected>
                  <ServiceDetails />
                </Protected>
              }
            />

            <Route
              path="/chat"
              element={
                <Protected>
                  <Chat />
                </Protected>
              }
            />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/start-password-reset"
              element={<EmailInputForResetPassword />}
            />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
