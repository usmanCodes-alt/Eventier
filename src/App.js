import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
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
import AuthContext from "./context/auth-context";

function App() {
  const state = {
    token: null,
    userId: null,
  };
  const authentication = (token) => {
    this.setState({ token: token });
  };
  const cancelAuth = (token) => {
    this.setState({ token: null });
  };
  return (
    <BrowserRouter>
      <AuthContext.Provider>
        <Header />
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="vendordashboard" element={<DashBoard />} />
          <Route path="signupPage" element={<Signup />} />
          <Route path="getAllServices" element={<GetAllServices />} />
          <Route path="totalOrders" element={<TotalOrders />} />
          <Route path="profileDetail" element={<ProfileDetail />} />
          <Route path="addService" element={<AddService />} />
          <Route path="vendorSignup" element={<VendorSignup />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
