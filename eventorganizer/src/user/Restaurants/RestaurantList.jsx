import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';
import './Restaurant.css';

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
      <div className="restaurant-container">
         {/* <h2>Restaurants</h2> */}
         <div className="restaurant-grid">
           {restaurants.map((restaurant) => (
             <div key={restaurant.id} className="restaurant-card">
               <img
                 src={restaurant.image}
                 className="restaurant-img"
                 alt={restaurant.name}
               />
               <div className="restaurant-details">
                 <h5 className="restaurant-title">{restaurant.name}</h5>
                 <p className="restaurant-description">{restaurant.description.substring(0, 100)}</p>
                 <Link to={`/restaurant/${restaurant.id}`} className="restaurant-btn">
                   See More Details
                 </Link>
              </div>
              </div>
           ))}
          </div>
        </div>
    </div>
  );
};

export default RestaurantList;