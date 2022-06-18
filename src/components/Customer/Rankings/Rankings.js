import axios from "axios";
import React, { useEffect, useState } from "react";

import Header from "../customerHeader/Header";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import "./rankings.css";

export default function Rankings() {
  const [serviceProviders, setServiceProviders] = useState();
  const [individualSpReviewsInfo, setIndividualSpReviewsInfo] = useState();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    axios
      .get("http://localhost:3000/rankings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setShowLoading(false);
        console.log(res);
        setServiceProviders(res.data.sentiments);
        setIndividualSpReviewsInfo(
          res.data.individualServiceProviderReviewsInformation
        );
      })
      .catch((err) => {
        setShowLoading(false);
        console.log(err);
      });
  }, []);

  const getPositiveCount = (email) => {
    const information = individualSpReviewsInfo.find(
      (reviewInfo) => reviewInfo.email === email
    );
    return information.numberOfPositiveReviews;
  };

  const getNegativeCount = (email) => {
    const information = individualSpReviewsInfo.find(
      (reviewInfo) => reviewInfo.email === email
    );
    return information.numberOfNegativeReviews;
  };

  const getFirstName = (email) => {
    const sp = serviceProviders.find((currentSp) => currentSp.email === email);
    return sp.first_name;
  };

  const getLastName = (email) => {
    const sp = serviceProviders.find((currentSp) => currentSp.email === email);
    return sp.last_name;
  };

  if (!serviceProviders || !individualSpReviewsInfo) {
    return <h1>Please wait</h1>;
  }

  return (
    <React.Fragment>
      <Header />
      <div>
        <table className="totalOrders__orderTable">
          <thead className="totalOrders__thead">
            <tr>
              <th className="totalOrders__theadCells first">
                Service Provider Email
              </th>
              <th className="totalOrders__theadCells">First Name</th>
              <th className="totalOrders__theadCells">Last Name</th>
              <th className="totalOrders__theadCells">
                Number of positive reviews
              </th>
              <th className="totalOrders__theadCells last">
                Number of negative reviews
              </th>
            </tr>
          </thead>

          <tbody>
            {individualSpReviewsInfo.map((sp) => {
              return (
                <tr
                  className="totalOrder_tbodyRow"
                  key={individualSpReviewsInfo.email}
                >
                  <td className="totalOrders__tbodyRowCell">{sp.email}</td>
                  <td className="totalOrders__tbodyRowCell">
                    {getFirstName(sp.email)}
                  </td>
                  <td className="totalOrders__tbodyRowCell">
                    {getLastName(sp.email)}
                  </td>
                  <td className="totalOrders__tbodyRowCell">
                    <span className="rankings__positive">
                      {getPositiveCount(sp.email)}
                    </span>
                  </td>
                  <td className="totalOrders__tbodyRowCell">
                    <span className="rankings__negative">
                      {getNegativeCount(sp.email)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </div>
    </React.Fragment>
  );
}
