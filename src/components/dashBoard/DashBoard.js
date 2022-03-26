import React, { useEffect, useContext } from "react";
import UserContext from "../../context/auth-context";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem("auth_token") && !user) {
      console.log("page refreshed while user was logged in");
      setUser({
        email: localStorage.getItem("email"),
        roles: JSON.parse(localStorage.getItem("roles")),
      });
    }
  }, []);

  return (
    <div className="container-fluid MainCardDashboard ">
      <div className="row carddatsboard1 ">
        <div>
          <h1>DashBoard</h1>
          <h3>Order Statics</h3>
        </div>
        <div className="row cardsDashboard row justify-content-md-center">
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                { title: "One", value: 95, color: "	#FF0000" },
                { title: "Two", value: 5, color: "#c0caca" },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                { title: "One", value: 95, color: "	#FF0000" },
                { title: "Two", value: 5, color: "#c0caca" },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                { title: "One", value: 95, color: "	#FF0000" },
                { title: "Two", value: 5, color: "#c0caca" },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                { title: "One", value: 95, color: "	#FF0000" },
                { title: "Two", value: 5, color: "#c0caca" },
              ]}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 ">
            <PieChart
              data={[
                { title: "One", value: 95, color: "	#FF0000" },
                { title: "Two", value: 5, color: "#c0caca" },
              ]}
            />
          </div>

          <div className="row">
            <div className="  col-lg-1 col-md-1 col-sm-1"></div>
            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>Total Orders</h3>
            </div>
            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>Pending Orders</h3>
            </div>
            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>In Progress</h3>
            </div>
            <div className="  col-lg-2 col-md-2 col-sm-2">
              <h3>Completed Orders</h3>
            </div>
            <div className=" titlepie col-lg-2 col-md-2 col-sm-2">
              <h3>Dilivered Orders</h3>
            </div>
          </div>
        </div>

        {/* <div className='col-lg-11 col-md-11 col-sm-11'>
                <div className='row piecharts'>
                    
                
                            <PieChart data={[ { title: 'One' , value: 95, color: '	#FF0000' }, { title: 'Two' , value: 5,
                            color: '#c0caca' }, ]} />
                           
                   
                   


                </div>
            </div> */}

        <div className="row">
          <div className=" col-lg-6 col-md-6 col-sm-6 latestOrdersDashBoard">
            <h1>Latest Orders</h1>
          </div>
          <div className=" col-lg-3 col-md-3 col-sm- ratingsDashboard">
            <h1>Rating and Review</h1>
          </div>
          <div className=" col-lg-2 col-md-2 col-sm-2 addserviceDashBoard">
            <Link className="btn" to="/addService">
              Add Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
