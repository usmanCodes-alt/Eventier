import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../customerHeader/Header";

export default function Rankings() {
  const [serviceProviders, setServiceProviders] = useState();
  const [individualSpReviewsInfo, setIndividualSpReviewsInfo] = useState();

  useEffect(() => {
    console.log("api call");
    axios
      .get("http://localhost:3000/rankings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setServiceProviders(res.data.sentiments);
        setIndividualSpReviewsInfo(
          res.data.individualServiceProviderReviewsInformation
        );
      })
      .catch((err) => console.log(err));
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

  if (!serviceProviders || !individualSpReviewsInfo) {
    return <h1>Please wait</h1>;
  }

  return (
    <React.Fragment>
      <Header />
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
          {serviceProviders.map((sp) => {
            return (
              <tr className="totalOrder_tbodyRow">
                <td className="totalOrders__tbodyRowCell">{sp.email}</td>
                <td className="totalOrders__tbodyRowCell">{sp.first_name}</td>
                <td className="totalOrders__tbodyRowCell">{sp.last_name}</td>
                <td className="totalOrders__tbodyRowCell">
                  {getPositiveCount(sp.email)}
                </td>
                <td className="totalOrders__tbodyRowCell">
                  {getNegativeCount(sp.email)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}
