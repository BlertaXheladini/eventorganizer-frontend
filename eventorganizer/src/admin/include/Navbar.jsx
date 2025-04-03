import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css"; // Ensure you import the custom CSS


function Navbar({ Toggle }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark">
      <i className="bi bi-justify-left fs-4 navbar-brand" onClick={Toggle}></i>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
        <i className="bi bi-search"></i>
      </div>

      <div className="navbar-nav ms-auto">
        <i className="bi bi-bell-fill nav-item"></i> 
        <i className="bi bi-envelope-fill nav-item"></i> 
        <i className="bi bi-gear-fill nav-item"></i>   
      </div>
    </nav>
  );
}

export default Navbar;