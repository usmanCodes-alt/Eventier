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

function App() {
  return (
    
    <BrowserRouter>
      <Header/>
      
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="signupPage" element={<Signup />} />
        <Route path="profileDetail" element={<ProfileDetail />} />
        <Route path="addService" element={<AddService />} />
        <Route path="vendorSignup" element={<VendorSignup />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
