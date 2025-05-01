import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';
import './Event.css'; 

const EventDetails = () => {
  const { id } = useParams();  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!id) {
          setError('Event ID is missing');
          setLoading(false);
          return;
        }

        const apiUrl = `http://localhost:5091/api/Events/GetEventById/${id}`;
        const response = await axios.get(apiUrl);
        
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Kontrollo nëse image është e përshtatshme
  const imageUrl = event.image.startsWith('./') 
    ? `${process.env.PUBLIC_URL}${event.image.replace('.', '')}` 
    : event.image;

  const handleReserveClick = () => {
    navigate('/reservationForUser', {
      state: {
        eventId: event.id,
        eventName: event.eventName,
        eventPrice: event.price,
      },
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="container-details">
        <div className="row">
          <div className="col-md-4">
            <div className="event-img-container-details">
              <img
                src={imageUrl}
                className="event-img-details"
                alt={event.eventName}
                onError={(e) => e.target.src = '/images/default.jpg'}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="event-details-text">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h3 className="event-title-details">{event.eventName}</h3>
                <span className="event-price-details">${event.price}</span>
              </div>
              <p className="event-description-details">{event.description}</p>
              <p className="event-text"><strong>Category:</strong> {event.eventCategories.categoryName}</p>
              <p className="event-text"><strong>Theme:</strong> {event.eventThemes.themeName}</p>
              <div className="d-flex justify-content-between mt-4">
                <button className="btn-event-back" onClick={() => navigate('/eventlist')}>Back</button>
                <button className="btn-event-reserve" onClick={handleReserveClick}>Reserve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;