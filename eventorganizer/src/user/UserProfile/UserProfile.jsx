import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // CSS për stilizimin e profilit
import { FaUserCircle } from 'react-icons/fa'; // Për ikonën e profilit
import { useNavigate } from 'react-router-dom'; // Për navigimin

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate(); // Hook për navigim

  useEffect(() => {
    // Merr ID-në e përdoruesit nga localStorage
    const userId = localStorage.getItem('userId');

    // Merr detajet e përdoruesit dhe rezervimet
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://localhost:7214/api/Users/GetUserById?id=${userId}`);
        setUserDetails(userResponse.data);

        const reservationResponse = await axios.get(`https://localhost:7214/api/Reservation/GetAllList`);
        const userReservations = reservationResponse.data.filter(
          (reservation) => reservation.userID === parseInt(userId)
        );
        setReservations(userReservations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Funksioni për të kthyer në Home page
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="profile-container">
      {/* Butoni për kthim në Home */}
      <button className="back-Button" onClick={handleBack}>
        ← Back
      </button>

    
      <div className="profile-wrapper">
        <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>
          <FaUserCircle className="profile-icon" />
          <h2 className="profile-name">
            {userDetails.firstName} {userDetails.lastName}
          </h2>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3 className="section-title">General Information</h3>
            <table className="info-table">
              <tbody>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{userDetails.email}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Reservations</h3>
            <div className="reservation-table-wrapper">
              <table className="reservation-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Reservation Date</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.reservationID}>
                      <td>{reservation.event?.eventName || 'Unknown'}</td>
                      <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                      <td>${reservation.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;