import React from 'react'
import logo from './logo.png'

export default function Header() {
return (
<div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">

        <div class="container-fluid">

            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <a class="navbar-brand mt-2 mt-lg-0" href="#">
                    <img src={logo}  height="30" alt="MDB Logo"loading="lazy" />
                </a>

                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Trending</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">New!</a>
                    </li>
                </ul>
                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" width ="70dp" />

            </div>



            <div class="d-flex align-items-center">

                <a class="text-reset me-3" href="#">
                    <i class="fas fa-shopping-cart"></i>
                </a>

                
                <a href="#!" class="btn btn-outline-white btn-rounded">Sign up!</a>
            </div>

        </div>

    </nav>


</div>
)
}