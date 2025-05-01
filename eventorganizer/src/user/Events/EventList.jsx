import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../include/Navbar';
import Footer from '../include/Footer';
import './Event.css'; 

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(''); 

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost:5091/api/Events/GetAllList');
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5091/api/Events/SearchEvent`, {
        params: {
          searchEvent: searchTerm
        }
      });
      setEvents(response.data);
    } catch (err) {
      console.error("Error searching events:", err);
    }
  };

  const handleSortChange = async (event) => {
    const sortOrder = event.target.value;
    setSortOrder(sortOrder); 

    try {
      const response = await axios.get('http://localhost:5091/api/Events/SortEvents', {
        params: {
          sortOrder: sortOrder
        }
      });
      setEvents(response.data); 
    } catch (err) {
      console.error("Error sorting events:", err);
    }
  };

  return (
    <div>
      <Nav/>
      <div className="container-event mt-3">
      <div className="search-bar-event mb-4">
          <input
            type="text"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

         {/* Dropdown për renditjen sipas çmimit */}
         <select 
            value={sortOrder} 
            onChange={handleSortChange} 
            className="price-sort-dropdown"
          >
            <option value="" className='price-sort-option'>Sort by Price</option>
            <option value="LowToHigh" className='price-sort-option'>Low to High</option>
            <option value="HighToLow" className='price-sort-option' >High to Low</option>
          </select>
        </div>

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