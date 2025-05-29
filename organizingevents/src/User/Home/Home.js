import { Link } from 'react-router-dom'; 
import React, { useRef } from 'react';
import Navbar from '../include/Navbar';
import Footer from '../include/Footer';
import './Home.css';

import weddings from '../images/wedding.jpg'; 
import birthday from '../images/birthday.jpg'; 
import engagement from '../images/engagement.jpg'; 
import imgpng from '../images/image-png.png'; 
import event1 from '../images/event1.jpeg'; 
import event2 from '../images/event2.jpeg'; 
import event3 from '../images/event3.jpeg'; 
import event4 from '../images/event4.jpeg'; 
import event5 from '../images/event5.jpg'; 
import event6 from '../images/event6.jpg'; 
import event7 from '../images/event7.jpg'; 
import event8 from '../images/event8.jpg'; 
import AddFeedback from './AddFeedback';


const Home = () => {
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="hero-image">
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
            <img src={weddings} alt="Event 1" />
            <h3>Weddings</h3>
            <p>We specialize in planning and executing the perfect wedding, tailored to your unique style and preferences.</p>
            <Link to="/eventlist" className="btn">Reserve Now</Link>
          </div>
          <div className="service-card">
            <img src={engagement} alt="Event 2" />
            <h3>Engagements</h3>
            <p>Celebrate your engagement with a memorable event that reflects your love and commitment.</p>
            <Link to="/eventlist" className="btn">Reserve Now</Link>
          </div>
          <div className="service-card">
            <img src={birthday} alt="Event 3" />
            <h3>Birthday Parties</h3>
            <p>Make your birthday celebration stand out with our creative and personalized party planning services.</p>
            <Link to="/eventlist" className="btn">Reserve Now</Link>
          </div>
        </div>
      </section>




      {/* Image & Text Section */}
      <section className="image-text-section">
        <div className="image-text-container">
          <img src={imgpng} alt="Special Event" />
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
          <div className="photo-item"><img src={event1} alt="Event 1" /></div>
          <div className="photo-item"><img src={event2} alt="Event 2" /></div>
          <div className="photo-item"><img src={event3} alt="Event 3" /></div>
          <div className="photo-item"><img src={event4} alt="Event 4" /></div>
          <div className="photo-item"><img src={event5} alt="Event 5" /></div>
          <div className="photo-item"><img src={event6} alt="Event 6" /></div>
          <div className="photo-item"><img src={event7} alt="Event 7" /></div>
          <div className="photo-item"><img src={event8} alt="Event 8" /></div>
        </div>
      </section>



      {/* Call to Action Section */}
      <div className="cta-feedback-container">
          <section className="cta-section">
            <h2>Ready to Plan Your Event?</h2>
            <p>Contact us now to begin planning your perfect event and ensure it's everything you've dreamed of.</p>
            <Link to="/contact" className="btn">Start Planning</Link>
          </section>

          <div className="feedback-form">
            <AddFeedback />
          </div>
      </div>


      <Footer />
    </div>
  );
};


export default Home;
