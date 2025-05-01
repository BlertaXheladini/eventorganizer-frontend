// Sidebar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUserShield,
  FaHome,
  FaUsers,
  FaCalendarDay,
  FaTag,
  FaListAlt,
  FaSignOutAlt,
  FaUtensils,
  FaConciergeBell,
  FaUserTie,
  FaEnvelope,
  FaComments,
} from "react-icons/fa";
import "../style.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const roleId = localStorage.getItem('roleId'); // Merr rolin nga localStorage

  // Funksioni për të bërë logout
  const handleLogout = () => {
    // Pastro të gjitha të dhënat nga localStorage
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Shfaq një mesazh për sukses (mund të shtosh edhe toast nëse ke nevojë)
    alert('Logged out successfully!'); // Opsionale: Mund ta zëvendësosh me toast nëse ke përdorur librarinë

    // Ridrejto përdoruesin në faqen kryesore (Home)
    navigate('/');
  };

  return (
    <div className="sidebar p-2">
      <div className="logo m-1">
        <FaUserShield className="admin-icon" /> {/* Admin icon */}
        <Link
          to="/dashboard"
          className={`dashboard-link ${
            location.pathname === "/dashboard" ? "active-link" : ""
          }`}
        >
          DASHBOARD
        </Link>{" "}
        {/* Dashboard link */}
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <Link
          to="/"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/" ? "active-link" : ""
          }`}
        >
          <FaHome className="fs-5 me-3" /> <span>Home</span>
        </Link>

        <Link
          to="/users"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/users" ? "active-link" : ""
          }`}
        >
          <FaUsers className="fs-5 me-3" /> <span>Users</span>
        </Link>

        <Link
          to="/eventsAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/eventsAdmin" ? "active-link" : ""
          }`}
        >
          <FaCalendarDay className="fs-5 me-3" /> <span>Events</span>
        </Link>

        <Link
          to="/eventThemesAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/eventThemesAdmin" ? "active-link" : ""
          }`}
        >
          <FaTag className="fs-5 me-3" /> <span>Event Themes</span>
        </Link>

        <Link
          to="/eventCategoriesAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/eventCategoriesAdmin" ? "active-link" : ""
          }`}
        >
          <FaListAlt className="fs-5 me-3" /> <span>Event Categories</span>
        </Link>

        <Link
          to="/reservations"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/reservations" ? "active-link" : ""
          }`}
        >
          <FaCalendarDay className="fs-5 me-3" /> <span>Reservations</span>
        </Link>

        {/* Mongo DB*/}
        <Link
          to="/restaurantsAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/restaurantsAdmin" ? "active-link" : ""
          }`}
        >
          <FaConciergeBell className="fs-5 me-3" /> <span>Restaurants</span>
        </Link>

        <Link
          to="/restaurantTypesAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/restaurantTypesAdmin" ? "active-link" : ""
          }`}
        >
          <FaUtensils className="fs-5 me-3" /> <span>Restaurant Types</span>
        </Link>

        {/* Shfaq Staff vetëm për SuperAdmin (roleId = 1) */}
        {roleId === '1' && (
          <Link
            to="/staffAdmin"
            className={`list-group-item py-2 rounded ${
              location.pathname === "/staffAdmin" ? "active-link" : ""
            }`}
          >
            <FaUserTie className="fs-5 me-3" /> <span>Staff</span>
          </Link>
        )}

        <Link
          to="/contactAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/contactAdmin" ? "active-link" : ""
          }`}
        >
          <FaEnvelope className="fs-5 me-3" /> <span>Contact</span>
        </Link>

        <Link
          to="/feedbackAdmin"
          className={`list-group-item py-2 rounded ${
            location.pathname === "/feedbackAdmin" ? "active-link" : ""
          }`}
        >
          <FaComments className="fs-5 me-3" /> <span>Feedback</span>
        </Link>

        <br></br>

        {/* Logout Button */}
        <button
          className="list-group-item logout-link py-2 rounded"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="fs-5 me-3" /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;