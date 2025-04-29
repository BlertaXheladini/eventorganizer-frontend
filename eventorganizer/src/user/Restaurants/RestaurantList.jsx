import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Ngarkimi i restoranteve
    async function fetchRestaurants() {
      try {
        const response = await axios.get('https://localhost:7214/api/Restaurants/GetAllList');
        setRestaurants(response.data);
      } catch (err) {
        console.error("Error loading restaurants:", err);
      }
    }
    fetchRestaurants();
  }, []);

  return (
    <div>
      <Navbar />
        <div className="container mt-4">
          <h2>Restaurants</h2>
          <div className="row">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={restaurant.image}
                    className="card-img-top"
                    alt={restaurant.name}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">{restaurant.description.substring(0, 100)}...</p>
                    <Link to={`/restaurant/${restaurant.id}`} className="btn btn-primary">
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