import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/auth-context";

import Search from "../searchServiceBar/Search";
import Card from "../../card/Card";
import Header from "../customerHeader/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [priceFilterServices, setPriceFilterServices] = useState([]);
  const [showSelectedServices, setShowSelectedServices] = useState();
  const [priceLimit, setPriceLimit] = useState();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      // user is not logged in.
      navigate("/customer-login");
    }

    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setShowLoading(true);
    axios
      .get("http://localhost:3000/customers/get-services", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setShowLoading(false);
        let { services } = response.data;
        console.log(services);
        setServices(services);
      })
      .catch((err) => {
        setShowLoading(false);
        console.log(err);
      });
  }, []);

  const onSearchSelected = (value) => {
    console.log(value);
    setShowSelectedServices(value);
  };

  const mapServicesOnHome = (services) => {
    return services.map((service) => {
      if (Number(priceLimit)) {
        if (service.unit_price <= priceLimit) {
          console.log(service);
          return (
            <Card
              key={service.service_database_id}
              url={service.static_url}
              serviceName={service.service_name}
              description={service.description}
              serviceId={service.service_database_id}
            />
          );
        }
      } else {
        return (
          <Card
            key={services.service_database_id}
            url={service.static_url}
            serviceName={service.service_name}
            description={service.description}
            serviceId={service.service_database_id}
          />
        );
      }
    });
  };

  useEffect(() => {
    if (!priceLimit) return;

    /**
     * price limit is set, filter services
     */
    setPriceFilterServices(
      services.filter((service) => service.unit_price <= priceLimit)
    );
  }, [priceLimit]);

  // useEffect(() => console.log(priceFilterServices), [priceFilterServices]);

  return (
    <React.Fragment>
      <Header />
      <Search showSelectedServicesOnHome={onSearchSelected} />
      <div className="home__price-filter-wrapper">
        <FilterAltIcon />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={priceLimit}
            onChange={(e) => setPriceLimit(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10000}>10,000</MenuItem>
            <MenuItem value={25000}>25,000</MenuItem>
            <MenuItem value={50000}>50,000</MenuItem>
            <MenuItem value={100000}>100,000</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <div className="home__services-wrapper">
        {showSelectedServices
          ? mapServicesOnHome(
              services.filter(
                (service) => service.service_type === showSelectedServices
              )
            )
          : mapServicesOnHome(services)}
      </div>
    </React.Fragment>
  );
}
