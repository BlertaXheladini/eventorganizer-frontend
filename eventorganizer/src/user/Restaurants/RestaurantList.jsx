import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';
import './Restaurant.css';
import Footer from '../include/Footer';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Shtimi i fushës për kërkim
  const [loading, setLoading] = useState(false); // Shtimi i indikatorit të ngarkimit

  // Funksioni për ngarkimin e restoranteve nga API
  const fetchRestaurants = async (term = '') => {
    setLoading(true); // Fillimi i ngarkimit
    try {
      const response = term
        ? await axios.get(`https://localhost:7214/api/Restaurants/SearchRestaurant?searchRestaurant=${term}`)
        : await axios.get('https://localhost:7214/api/Restaurants/GetAllList');
      setRestaurants(response.data);
    } catch (err) {
      console.error("Error loading restaurants:", err);
    }
    setLoading(false); // Mbarimi i ngarkimit
  };

  // Ngarkimi fillestar i restoranteve
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Funksioni për kërkimin e restoranteve
  const handleSearch = (e) => {
    e.preventDefault();
    fetchRestaurants(searchTerm);
  };

  return (
    <div>
      <Navbar />
      <div className="restaurant-container">
        {/* Fusha për kërkim */}
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>

        {/* Indikatori i ngarkimit */}
        {loading ? <p>Loading restaurants...</p> : null}

        {/* Tabela për restorantet */}
        <div className="restaurant-grid">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
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
            ))
          ) : (
            <p>No restaurants found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantList;