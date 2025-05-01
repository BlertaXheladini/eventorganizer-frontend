import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffList.css';  // Sigurohu që të krijosh dhe të shtosh CSS-in për stilizimin
import Footer from '../include/Footer';
import Navbar from '../include/Navbar';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);

  // Ngarkimi i stafit nga API
  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await axios.get('http://localhost:5091/api/Staff/GetAllList');
        setStaffList(response.data);
      } catch (err) {
        console.error("Error loading staff:", err);
      }
    }
    fetchStaff();
  }, []);

  return (
    <div> 
        <Navbar />

        {/* Part one */}
      <div className="stafftop-image">
      </div>

    <div className="staff-container">
    <h2>Our Staff</h2>
      <div className="staff-grid">
        {staffList.length > 0 ? (
          staffList.map((staff) => (
            <div key={staff.id} className="staff-card">
              <img src={staff.image} className="staff-img" alt={`${staff.firstName} ${staff.lastName}`} />
              <div className="staff-details">
                <h5 className="staff-name">{staff.firstName} {staff.lastName}</h5>
                <p className="staff-position">{staff.position}</p>
                <p className="staff-contact"> {staff.contactNumber}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No staff members found.</p>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default StaffList;