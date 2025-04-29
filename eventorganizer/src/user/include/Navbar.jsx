import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import logo from '../images/logo.jpg'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container"> 
      <div className="navbar-top">
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <i className="bi bi-list"></i>
        </button>
        <img src={logo} alt="Organizing Events Logo" className="logo-home" />
        <div className="icons">
          <i className="bi bi-search"></i>
          <i className="bi bi-bell"></i>
        </div>
      </div>
      <div className="navbar-bottom">
        <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/AboutUs" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </li>
          <li>
          <Link to="/stafflist" className="nav-link">Staff</Link>
          </li>
          <li>
            <Link to="/eventList" className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</Link>
          </li>
          <li>
            <Link to="/restaurants" className="nav-link" onClick={() => setIsMenuOpen(false)}>Restaurants</Link>
            <Link to="/restaurantlist" className="nav-link">Restaurants</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;