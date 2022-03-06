import React from 'react'
import styles from "./Footer.css";
export default function Footer() {
return (
<footer id="footer" className="footer-1">
    <div className="main-footer widgets-dark typo-light">
        <div className="container">
            <div className="row">

                <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="widget subscribe no-box">
                        <h5 className="widget-title">EVENTIER<span></span></h5>
                        <p>AUTOMATE YOUR BUSINESS </p>
                    </div>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="widget no-box">
                        <h5 className="widget-title">Quick Links<span></span></h5>
                        <ul className="thumbnail-widget">
                            <li>
                                <div className="thumb-content"><a href="#.">Home</a></div>
                            </li>
                            <li>
                                <div className="thumb-content"><a href="#.">Trending</a></div>
                            </li>
                            <li>
                                <div class="thumb-content"><a href="#.">New!</a></div>
                            </li>


                        </ul>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-3">
                    <div class="widget no-box">
                        <h5 class="widget-title">Get Started<span></span></h5>
                        <p>Get Your Business Automated </p>

                    </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-3">

                    <div class="widget no-box">
                        <h5 class="widget-title">Contact Us<span></span></h5>

                        <p><a href="mailto:info@domain.com" title="glorythemes">info@eventier.com</a></p>
                        <ul class="social-footer2">

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div className="footer-copyright">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <p>Copyright EVENTIER © 2021. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
</footer>
)
}