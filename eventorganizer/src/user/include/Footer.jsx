import React from "react";
import "./Footer.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Services</a>
        <a href="#">Events</a>
        <a href="#">Restaurants</a>
        <a href="#">Contact</a>
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
      <p className="footer-text">© Event Organizer | 2024</p>
    </footer>
  );
};

export default Footer;