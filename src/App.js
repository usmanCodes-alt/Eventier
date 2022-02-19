import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/signupmainpage/Signup.js";
import Footer from "./components/footer/Footer";
import AddService from "./components/addService/AddService";
import VendorSignup from "./components/vendorSignup/VendorSignup";
import ProfileDetail from "./components/profileDetail/ProfileDetail";

import SigninPage from "./components/signinPage/SigninPage";
import Header from "./components/Header/Header.js";

function App() {
  return (
    <>
      <Header />
      <AddService />
      <Footer />
    </>
  );
}

export default App;
