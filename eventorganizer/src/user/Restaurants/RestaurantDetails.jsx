import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';
import './Restaurant.css';  // Skedari CSS për stilizimin

const RestaurantDetails = () => {
  const { id } = useParams();  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        if (!id) {
          setError('Restaurant ID is missing');
          setLoading(false);
          return;
        }

        const apiUrl = `https://localhost:7214/api/Restaurants/GetRestaurantsById/${id}`;
        const response = await axios.get(apiUrl);
        
        setRestaurant(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load restaurant details');
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Kontrollo nëse image është e përshtatshme
  const imageUrl = restaurant.image.startsWith('./') 
    ? `${process.env.PUBLIC_URL}${restaurant.image.replace('.', '')}` 
    : restaurant.image;

  return (
    <div>
      <Navbar/>
      <div className="container-details">
          <div className="row">
            <div className="col-md-4">
              <div className="restaurant-img-container-details">
                <img
                  src={imageUrl}
                  className="restaurant-img-details"
                  alt={restaurant.name}
                  onError={(e) => e.target.src = '/images/default.jpg'}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="restaurant-details-text">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <h3 className="restaurant-title-details">{restaurant.name}</h3>
                </div>
                <span className="restaurant-location-details">{restaurant.location}</span>
                <p className="restaurant-description-details">{restaurant.description}</p>
                
                {/* Shtimi i tipit të restorantit */}
                <p className="restaurant-text"><strong>Type:</strong> {restaurant.restaurantType?.name || "N/A"}</p>

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn-restaurant-back" onClick={() => navigate('/restaurantlist')}>Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default RestaurantDetails;