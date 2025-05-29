import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/restaurantlist">Restaurants</Link>
        <Link to="/eventlist">Events</Link>
        <Link to="/stafflist">Staff</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <div className="footer-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
          <i className="fab fa-pinterest"></i>
        </a>
      </div>
      <p className="footer-text">© Event Organizer | 2025</p>
    </footer>
  );
};

export default Footer;
