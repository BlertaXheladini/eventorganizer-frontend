import React, { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip,Legend,} from "chart.js";
 import { Line, Bar, Doughnut } from "react-chartjs-2";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
 
 ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   LineElement,
   PointElement,
   ArcElement,
   Title,
   Tooltip,
   Legend
 );

function Dashboard() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const Toggle = () => {
    setToggle(!toggle);
  };
  const data = {
    labels: ["June", "July", "August", "September", "October", "November"],
    datasets: [
      {
        label: "Data",
        data: [410, 550, 610 , 415, 250, 180],
        backgroundColor: [
          "rgba(0, 123, 255, 0.6)", 
          "rgba(23, 162, 184, 0.6)", 
          "rgba(255, 193, 7, 0.6)",  
          "rgba(220, 53, 69, 0.6)",  
          "rgba(40, 167, 69, 0.6)",  
          "rgba(255, 87, 34, 0.6)"   
        ],
        borderColor: [
          "rgba(0, 123, 255, 1)", 
          "rgba(23, 162, 184, 1)", 
          "rgba(255, 193, 7, 1)",  
          "rgba(220, 53, 69, 1)",  
          "rgba(40, 167, 69, 1)",  
          "rgba(255, 87, 34, 1)"  
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        backgroundSize: "cover",
        overflowX: "hidden",
      }}
    >
  <div className="row" style={{ height: "100%" }}>
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}

<div className={`col ${toggle ? "offset-md-2" : ""}`} style={{ paddingLeft: "0", paddingRight: "0" }}>
          <Navbar Toggle={Toggle} />
         
          {/* Main Dashboard Content */}
          <div className="container-fluid">
             <div className="row mt-4">
               {/* First Row with Two Charts */}
               <div className="col-md-6 mb-4">
                 <div className="card p-3 shadow-sm" style={{ height: "280px", width: "95%", overflow: "hidden", marginLeft: "30px", borderRadius: "0" }}>
                   <h5 className="card-title chart-title">User Growth</h5>
                   <div style={{ height: "200px" }}>
                     <Line data={data} options={options} />
                   </div>
                 </div>
               </div>
 
               <div className="col-md-6 mb-4">
                 <div className="card p-3 shadow-sm" style={{ height: "280px", width: "95%", overflow: "hidden", borderRadius: "0" }}>
                   <h5 className="card-title chart-title">Event Reservations</h5>
                   <div style={{ height: "200px" }}>
                     <Bar data={data} options={options} />
                   </div>
                 </div>
               </div>
             </div>
 
             {/* Second Row with Doughnut Chart */}
             <div className="row">
               <div className="col-md-6 mb-4">
                 <div className="card p-3 shadow-sm" style={{ height: "280px", width: "95%", overflow: "hidden", marginLeft: "30px", borderRadius: "0" }}>
                   <h5 className="card-title chart-title">Income Breakdown</h5>
                   <div
                     className="d-flex justify-content-center align-items-center"
                     style={{ height: "200px", width: "100%" }}
                   >
                     <div
                       style={{
                         height: "300px",
                         width: "300px",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                       }}
                     >
                       <Doughnut data={data} options={doughnutOptions} />
                     </div>
                   </div>
                 </div>
               </div>
 
               {/* Enhanced Upcoming Events Section */}
               <div className="col-md-6 mb-4">
                 <div className="card shadow-sm" style={{ height: "280px", width: "95%", overflow: "hidden", borderRadius: "0",paddingLeft:"25px",paddingTop:"10px" }}>
                   <h5 className="card-title chart-title">Upcoming Events</h5>
                   <div className="event-cards">
                     <div className="row">
                       <div className="col-md-6 mb-3">
                         <div className="card">
                           <img src="./images/event1.png" className="card-img-top" alt="Event 1" />
                           <div className="card-body">
                             <h6 className="card-subtitle mb-1 text-muted">Wedding Ceremony</h6>
                             <p className="card-text"><em>12th Oct 2024</em></p>
                             <Link to="/eventsAdmin" className="btn btn-sm event-details">More Details</Link>
                           </div>
                         </div>
                       </div>
                       <div className="col-md-6 mb-3">
                         <div className="card">
                           <img src="./images/event2.avif" className="card-img-top" alt="Event 2" />
                           <div className="card-body">
                             <h6 className="card-subtitle mb-1 text-muted">Corporate Gala</h6>
                             <p className="card-text"><em>25th Nov 2024</em></p>
                             <Link to="/eventsAdmin" className="btn btn-sm event-details">More Details</Link>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>



        </div>
      </div>
    </div>
  );
}

export default Dashboard;