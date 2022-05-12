import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="footer__content">
        <h3>Eventier</h3>
        <p>
          An E-Commerce store that brings Customers and Businesses together on
          one single platform.
        </p>
        <div className="footer__bottom">
          <p>
            Copy Right - All Rights Reserved | <span>Privacy Policy</span> |{" "}
            <span>Disclaimer</span> | <span>Contact Us</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
