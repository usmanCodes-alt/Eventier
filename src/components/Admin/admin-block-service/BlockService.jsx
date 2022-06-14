import React, { useEffect, useState } from "react";

import Header from "../admin-header/Header";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

export default function AdminServiceList() {
  const [services, setServices] = useState([]);
  //   const [serviceProviders, setServiceProviders] = useState([]);

  const getAllServices = async () => {
    const res = await axios.get(
      "http://localhost:3000/eventier/admin/get-all-services",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    setServices(res.data.services);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const blockService = (id) => {
    console.log("Blocking: " + id);
    axios
      .patch(
        "http://localhost:3000/eventier/admin/block-service/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        getAllServices();
      })
      .catch((err) => console.log(err));
  };

  const unBlockService = (id) => {
    console.log("un-Blocking: " + id);
    axios
      .patch(
        "http://localhost:3000/eventier/admin/unblock-service/" + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then((res) => {
        getAllServices();
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
              <th className="cart__thead-cells first">Service ID</th>
              <th className="cart__thead-cells">Provider Email</th>
              <th className="cart__thead-cells">Service Name</th>
              <th className="cart__thead-cells">Service Type</th>
              <th className="cart__thead-cells">Store Name</th>
              <th className="cart__thead-cells last">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => {
              return (
                <tr className="cart__tbodyRow" key={s.service_id}>
                  <td className="cart__tbody-cells">{s.service_id}</td>
                  <td className="cart__tbody-cells">{s.email}</td>
                  <td className="cart__tbody-cells">{s.service_name}</td>
                  <td className="cart__tbody-cells">{s.service_type}</td>
                  <td className="cart__tbody-cells">{s.store_name}</td>
                  <td className="cart__tbody-cells">
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={s.blocked === "1" ? "Block" : "Un-Block"}
                        label="Status"
                        onChange={(e) => {
                          if (e.target.value === "Block")
                            blockService(s.service_id);
                          else unBlockService(s.service_id);
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
