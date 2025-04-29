import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../include/Navbar';

const RestaurantDetails = () => {
  const { id } = useParams();  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        if (!id) {
          setError('Restaurant ID is missing');
          setLoading(false);
          return;
        }

        // Rruga e saktë për marrjen e detajeve të një restoranti nga backend-i
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

  const imageUrl = restaurant.image.startsWith('./') 
    ? `${process.env.PUBLIC_URL}${restaurant.image.replace('.', '')}`
    : restaurant.image;

  return (
    <div>
        <Navbar />
        <div className="container mt-4">
          <div className="card">
            <img
              src={imageUrl}
              className="card-img-top"
              alt={restaurant.name}
              style={{ height: "400px", objectFit: "cover" }}
              onError={(e) => e.target.src = '/images/fallback.jpg'} // Fallback image
            />
            <div className="card-body">
              <h3 className="card-title">{restaurant.name}</h3>
              <p className="card-text">{restaurant.description}</p>
              <p><strong>Location:</strong> {restaurant.location}</p>
              <p><strong>Type:</strong> {restaurant.RestaurantType?.name || "N/A"}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default RestaurantDetails;