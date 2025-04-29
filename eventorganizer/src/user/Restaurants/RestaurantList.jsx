// Events.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';
// import Footer from '../include/Footer';

const RestaurantList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Ngarkimi i eventeve
    async function fetchEvents() {
      try {
        const response = await axios.get('https://localhost:7214/api/Restaurants/GetAllList');
        setEvents(response.data);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
        <div className="container mt-4">
          <h2>Restaurants</h2>
          <div className="row">
            {events.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={event.image}
                    className="card-img-top"
                    alt={event.eventName}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text">{event.description.substring(0, 100)}...</p>
                    <Link to={`/event/${event.id}`} className="btn btn-primary">
                      See More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default RestaurantList;