import React, { useEffect, useState } from "react";

import Header from "../admin-header/Header";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

export default function AdminServiceProvidersList() {
  const [serviceProviders, setServiceProviders] = useState([]);

  const getAllServiceProviders = async () => {
    const res = await axios.get(
      "http://localhost:3000/eventier/admin/get-all-service-providers",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    const { rows: sps } = res.data;
    setServiceProviders(sps);
  };

  useEffect(() => {
    getAllServiceProviders();
  }, []);

  const blockProviderAccount = (serviceProviderEmail) => {
    axios
      .patch(
        "http://localhost:3000/eventier/admin/block-account",
        {
          targetAccountEmail: serviceProviderEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        getAllServiceProviders();
      })
      .catch((err) => console.log(err));
  };

  const unBlockProviderAccount = (serviceProviderEmail) => {
    axios
      .patch(
        "http://localhost:3000/eventier/admin/unblock-account",
        {
          targetAccountEmail: serviceProviderEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        getAllServiceProviders();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Header />
      <div style={{ paddingBottom: "260px" }}>
        <table className="cart__table">
          <thead>
            <tr>
              <th className="cart__thead-cells first">First Name</th>
              <th className="cart__thead-cells">Last Name</th>
              <th className="cart__thead-cells">Email</th>
              <th className="cart__thead-cells last">Actions</th>
            </tr>
          </thead>

          <tbody>
            {serviceProviders.map((sp) => {
              return (
                <tr className="cart__tbodyRow" key={sp.service_provider_id}>
                  <td className="cart__tbody-cells">{sp.first_name}</td>
                  <td className="cart__tbody-cells">{sp.last_name}</td>
                  <td className="cart__tbody-cells">{sp.email}</td>
                  <td className="cart__tbody-cells">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sp.blocked === "1" ? "Block" : "Un-Block"}
                        label="Status"
                        onChange={(e) => {
                          if (e.target.value === "Block")
                            blockProviderAccount(sp.email);
                          else unBlockProviderAccount(sp.email);
                        }}
                      >
                        <MenuItem value="Block">Block</MenuItem>
                        <MenuItem value="Un-Block">Un-Block</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
