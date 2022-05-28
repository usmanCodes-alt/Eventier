import React from "react";

import notFoundImage from "../../images/notFound.png";
import "./404.css";

export default function NotFound() {
  return (
    <div className="not-found__container">
      <img src={notFoundImage} alt="Page not found" height="300px" />
      <h6>The URL you entered is not supported.</h6>
    </div>
  );
}
