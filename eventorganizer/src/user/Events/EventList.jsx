import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';
import Footer from '../include/Footer';
import './Event.css'; 

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('https://localhost:7214/api/Events/GetAllList');
        setEvents(response.data);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="container-event mt-4">
        {/* Kontrollo nëse ka evente */}
        {events.length === 0 ? (
          <div className="no-events-message">
            <h4>There is no event available!</h4>
          </div>
        ) : (
          <div className="row">
            {events.map((event) => (
              <div key={event.id} className="col-md-4 mb-4">
                <div className="card event-card h-100">
                  <div className="event-img-container">
                    <img
                      src={event.image}
                      className="event-img"
                      alt={event.eventName}
                    />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title-event mb-0">{event.eventName}</h5>
                      <span className="event-price">${event.price}</span>
                    </div>
                    <Link to={`/event/${event.id}`} className="btn-event mt-auto">
                      See More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventList;