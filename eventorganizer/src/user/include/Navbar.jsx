import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import logo from '../images/logo.jpg'; 

const Navbar = () => {
  const navigate = useNavigate();
  const roleId = localStorage.getItem('roleId');

  const handleLogout = () => {
    localStorage.removeItem('roleId');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="navbar-container"> 
      <div className="navbar-top">
        <img src={logo} alt="Organizing Events Logo" className="logo-home" />
        <div className="icons">
          <i className="bi bi-search"></i>
          <i className="bi bi-bell"></i>
          <i className="bi bi-list"></i>
          {!roleId ? (
            <>
              <Link to="/login" style={{textDecoration:'none'}}>
                <button id="loginButton"><i className="bi bi-person-fill-up"></i>Login</button>
              </Link>
              <Link to="/register" style={{textDecoration:'none'}}>
                <button id="registerButton"><i className="bi bi-person-add"></i>Register</button>
              </Link>
            </>
          ) : (
            <button id="logoutButton" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i>Logout</button>
          )}
        </div>
      </div>
      <div className="navbar-bottom">
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/aboutus" className="nav-link">About Us</Link>
          </li>
          <li>
            <Link to="/stafflist" className="nav-link">Staff</Link>
          </li>
          <li>
            <Link to="/eventlist" className="nav-link">Events</Link>
          </li>
          <li>
            <Link to="/restaurantlist" className="nav-link">Restaurants</Link>
          </li>
          <li>
            <Link to="/contactus" className="nav-link">Contact</Link>
          </li>
          {roleId === '1' && (
          <li>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Navbar;