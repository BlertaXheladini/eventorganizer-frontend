import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../include/Navbar';
import Footer from '../include/Footer';
import './Home.css';

// Temporary placeholder for images until real ones are added
const placeholderImage = 'https://via.placeholder.com/400x300';

const Home = () => {
    const servicesRef = useRef(null);

    const scrollToServices = () => {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    
    return (
        <div>
          <Navbar />
    
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-text">
              <h1>Turn Your Dream Event Into Reality</h1>
              <p>We bring your vision to life, creating unforgettable <br /> experiences tailored just for you.</p>
              <button onClick={scrollToServices} className="cta-button">Explore Our Services</button>
            </div>
          </div>
    
          {/* Services Section */}
          <section ref={servicesRef} className="services-section">
            <h2>Our Services</h2>
            <div className="service-cards">
              <div className="service-card">
                <img src={placeholderImage} alt="Wedding Events" />
                <h3>Weddings</h3>
                <p>We specialize in planning and executing the perfect wedding, tailored to your unique style and preferences.</p>
                <Link to="/events" className="btn">Reserve Now</Link>
              </div>
              <div className="service-card">
                <img src={placeholderImage} alt="Engagement Events" />
                <h3>Engagements</h3>
                <p>Celebrate your engagement with a memorable event that reflects your love and commitment.</p>
                <Link to="/events" className="btn">Reserve Now</Link>
              </div>
              <div className="service-card">
                <img src={placeholderImage} alt="Birthday Events" />
                <h3>Birthday Parties</h3>
                <p>Make your birthday celebration stand out with our creative and personalized party planning services.</p>
                <Link to="/events" className="btn">Reserve Now</Link>
              </div>
            </div>
          </section>
    
          {/* Image & Text Section */}
          <section className="image-text-section">
            <div className="image-text-container">
              <img src={placeholderImage} alt="Special Event" />
              <div className="text-content">
                <h2>Why Choose Us?</h2>
                <p>We have years of experience in planning events, and we know how to make your special day perfect. 
                  Our team works closely with you to understand your needs and bring your vision to life. We handle all 
                  the details so you can enjoy a smooth and memorable experience. Whether it's a small gathering or a
                   big celebration, we're here to make it extraordinary and stress-free.
                </p>
                <Link to="/aboutus" className="btn">Read More</Link>
              </div>
            </div>
          </section>
    
          {/* Past Events Slider */}
          <section className="photo-grid-section">
            <h2>Past Events</h2>
            <div className="photo-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="photo-grid-item">
                  <img src={placeholderImage} alt={`Event ${num}`} />
                </div>
              ))}
            </div>
          </section>
    
          {/* Call to Action Section */}
          <section className="cta-section">
            <h2>Ready to Plan Your Event?</h2>
            <p>Contact us now to begin planning your perfect event and ensure it's everything you've dreamed of.</p>
            <Link to="/contactus" className="btn">Start Planning</Link>
          </section>
    
          <Footer />
        </div>
      );
    };
    
export default Home;