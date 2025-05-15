import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../include/Navbar';
import Footer from '../include/Footer';
import { FaStar } from 'react-icons/fa'; // Importo ikonën për yjet
import './Aboutus.css';
import aboutus2 from '../images/aboutus2.jpg'; 

const AboutUs = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Ngarkimi i feedback-eve nga API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5091/api/Feedback/GetAllList');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error loading feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Funksioni për të shfaqur yjet
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={20}
          color={i <= rating ? "#ffc107" : "#e4e5e9"} // Yjet e mbushura për rating dhe ato bosh
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <Navbar />
      
      {/* Part one */}
      <div className="aboutustop-image"></div>

      {/* Part two - Our Mission */}
      <section className="aboutus-mission">
        <div className="container mission-grid">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide top-notch event planning and organizing services to make your special moments even more memorable. 
              We are dedicated to transforming ideas into extraordinary events, with a focus on detail, creativity, and client satisfaction. 
              Whether it’s a wedding, corporate gathering, or a social event, we strive to create seamless and unforgettable experiences that reflect your vision. 
              We believe in pushing the boundaries of innovation and are committed to offering personalized solutions for every event, ensuring that every aspect is meticulously planned and executed.
            </p>
          </div>
          <div className="mission-image">
            <img src={aboutus2} alt="Our Mission" />
          </div>
        </div>
      </section>

      {/* Part three - Our History */}
      <section className="aboutus-history">
        <div className="container">
          <h2>Our History</h2>
          <p>
            Founded in 2015, our event organizing company has grown from a small startup to a leading provider
            of unique and memorable events. With hundreds of successful weddings, corporate events, and social gatherings
            under our belt, we continue to innovate and expand to offer the best possible service to our clients.
          </p>
        </div>
      </section>

      {/* Part four - Feedback Section */}
      <section className="aboutus-testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div key={feedback.id} className="testimonial">
                  <h4>{feedback.name} {feedback.surname}</h4> {/* Emri dhe mbiemri */}
                  <div className="feedback-stars">{renderStars(feedback.rating)}</div> {/* Yjet */}
                  <h5 className="feedback-event">{feedback.events.eventName}</h5> {/* Eventi */}
                  <p>"{feedback.comments}"</p> {/* Mesazhi */}
                </div>
              ))
            ) : (
              <p>No feedback available yet.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;