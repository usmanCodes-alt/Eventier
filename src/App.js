import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";

// landing page
import { default as SiteLandingPage } from "./components/LandingPage/Landing.jsx";

// Admin components
import { default as AdminLogin } from "./components/Admin/admin-login/AdminLogin";
import AdminServiceProvidersList from "./components/Admin/admin-block-account/AdminServiceProviders";
import AdminServiceList from "./components/Admin/admin-block-service/BlockService.jsx";

// Service provider components
import AddService from "./components/ServiceProvider/addService/AddService";
import VendorSignup from "./components/ServiceProvider/signupmainpage/Signup";
import { default as ServiceProviderProfile } from "./components/ServiceProvider/serviceProviderProfile/Profile";
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
import { default as ServiceProvidersRankings } from "./components/Customer/Rankings/Rankings";

import Protected from "./components/ProtectedRoute/Protected.js";
import NotAllowOnLogin from "./components/NotAllowOnLogin/NotAllowOnLogin";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { default as EmailInputForResetPassword } from "./components/EmailInput/EmailInput";

import NotFound from "./components/404-page/404";

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

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          {/*<Header />*/}

          <Routes>
            <Route path="/" element={<SiteLandingPage />} />
            {/** Customer endpoints */}
            <Route
              path="/login"
              element={
                <NotAllowOnLogin>
                  <Login />
                </NotAllowOnLogin>
              }
            />
            <Route
              path="/customer-signup"
              element={
                <NotAllowOnLogin>
                  <CustomerSignUp />
                </NotAllowOnLogin>
              }
            />
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
            <Route
              path="/customer/rankings"
              element={
                <Protected>
                  <ServiceProvidersRankings />
                </Protected>
              }
            />

            {/** SP endpoints */}
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
              element={
                <NotAllowOnLogin>
                  <VendorSignup />
                </NotAllowOnLogin>
              }
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

            {/** Admin endpoints */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin/block/sp"
              element={<AdminServiceProvidersList />}
            />
            <Route path="/admin/block/service" element={<AdminServiceList />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/start-password-reset"
              element={<EmailInputForResetPassword />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
