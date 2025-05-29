import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaUserShield, FaHome, FaUsers, FaCalendarDay, FaTag, FaListAlt, FaSignOutAlt, 
  FaUtensils, FaConciergeBell, FaUserTie, FaEnvelope, FaComments 
} from "react-icons/fa";
import "../style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const roleId = localStorage.getItem("roleId"); // Merr rolin nga localStorage

  const handleLogout = () => {
    // Fshij të gjitha të dhënat nga localStorage
    localStorage.removeItem("roleId");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    toast.success("Logged out successfully!", {
      className: "custom-toast",
    });

    setTimeout(() => {
      navigate("/"); // Navigon në faqen kryesore pas 2 sekondash
    }, 2000);
  };

  // Funksion ndihmës për të kontrolluar nëse ruta është aktive
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <div className="sidebar p-2">
      <div className="logo m-1">
        <FaUserShield className="admin-icon" />
        <Link to="/dashboard" className={`dashboard-link ${isActive("/dashboard")}`}>
          DASHBOARD
        </Link>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <Link to="/" className={`list-group-item py-2 rounded ${isActive("/")}`}>
          <FaHome className="fs-5 me-3" /> <span>Home</span>
        </Link>

        <Link to="/users" className={`list-group-item py-2 rounded ${isActive("/users")}`}>
          <FaUsers className="fs-5 me-3" /> <span>Users</span>
        </Link>

        <Link to="/eventsAdmin" className={`list-group-item py-2 rounded ${isActive("/eventsAdmin")}`}>
          <FaCalendarDay className="fs-5 me-3" /> <span>Events</span>
        </Link>

        <Link to="/eventThemesAdmin" className={`list-group-item py-2 rounded ${isActive("/eventThemesAdmin")}`}>
          <FaTag className="fs-5 me-3" /> <span>Event Themes</span>
        </Link>

        <Link to="/eventCategoriesAdmin" className={`list-group-item py-2 rounded ${isActive("/eventCategoriesAdmin")}`}>
          <FaListAlt className="fs-5 me-3" /> <span>Event Categories</span>
        </Link>

        <Link to="/reservations" className={`list-group-item py-2 rounded ${isActive("/reservations")}`}>
          <FaCalendarDay className="fs-5 me-3" /> <span>Reservations</span>
        </Link>

        <Link to="/restaurantsAdmin" className={`list-group-item py-2 rounded ${isActive("/restaurantsAdmin")}`}>
          <FaConciergeBell className="fs-5 me-3" /> <span>Restaurants</span>
        </Link>

        <Link to="/restaurantTypesAdmin" className={`list-group-item py-2 rounded ${isActive("/restaurantTypesAdmin")}`}>
          <FaUtensils className="fs-5 me-3" /> <span>Restaurant Types</span>
        </Link>

        {roleId === "1" && (
          <Link to="/staffAdmin" className={`list-group-item py-2 rounded ${isActive("/staffAdmin")}`}>
            <FaUserTie className="fs-5 me-3" /> <span>Staff</span>
          </Link>
        )}

        <Link to="/contactAdmin" className={`list-group-item py-2 rounded ${isActive("/contactAdmin")}`}>
          <FaEnvelope className="fs-5 me-3" /> <span>Contact</span>
        </Link>

        <Link to="/feedbackAdmin" className={`list-group-item py-2 rounded ${isActive("/feedbackAdmin")}`}>
          <FaComments className="fs-5 me-3" /> <span>Feedback</span>
        </Link>

        {/* Butoni Logout */}
        <button
          className="list-group-item logout-link py-2 rounded"
          onClick={handleLogout}
          type="button"
        >
          <FaSignOutAlt className="fs-5 me-3" /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
