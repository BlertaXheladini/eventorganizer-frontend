import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

function Dashboard() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}

        <div className="col-4 col-md-2"></div>
        <div className="col">
          <Navbar Toggle={Toggle} />
         



        </div>
      </div>
    </div>
  );
}

export default Dashboard;