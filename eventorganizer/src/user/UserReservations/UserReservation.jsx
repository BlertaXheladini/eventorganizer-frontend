import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import './UserReservation.css';


export default function UserReservation() {
  const location = useLocation();
  const eventDetails = location.state || {};
  const navigate = useNavigate();

  const [reservationDate, setReservationDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(eventDetails.eventPrice || '');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [eventID, setEventID] = useState(eventDetails.eventId || 0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');

    if (storedUserId) setUserId(Number(storedUserId));
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);

    fetch('http://localhost:5091/api/Events/GetAllList')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);


  const handleBackClick = () => {
    navigate(`/event/${eventDetails.eventId}`); // Navigo te faqja e detajeve të ngjarjes
  };


  const handleEventChange = (e) => {
    const selectedEvent = events.find((event) => event.id === Number(e.target.value));
    if (selectedEvent) {
      setEventID(selectedEvent.id);
      setTotalPrice(Number(selectedEvent.price));
    }
  };

  const handlePaymentClick = async () => {
    const reservationData = {
      name: firstName,
      surname: lastName,
      reservationDate,
      totalPrice,
      userID: Number(userId),
      eventID,
    };
  
    try {
      const response = await fetch('http://localhost:5091/api/Reservation/AddReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result); // Printo përgjigjen e serverit
  
        const reservationId = result.reservationID; // Përdor reservationID në vend të reservationId
  
        if (reservationId) {
          console.log('Reservation ID:', reservationId);
  
          // Ruaj të dhënat në localStorage
          localStorage.setItem('name', firstName);
          localStorage.setItem('surname', lastName);
          localStorage.setItem('amount', totalPrice);
          localStorage.setItem('reservationId', reservationId); // Ruaj reservationId në localStorage
  
          navigate('/paymentform');
        } else {
          console.error('Reservation ID is undefined.');
          toast.error('Reservation failed. Please try again.');
        }
      } else {
        toast.error(`Date ${reservationDate} for this event is reserved!`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred!');
    }
  };
  

  return (
    <div className="reservationContainer">
          <button className="backButton" onClick={handleBackClick}>
          ←Back
          </button>
      <div className="reservationBox">
        <h2>Make Your Reservation</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputContainer-reservation">
            <label>Name</label>
            <input type="text" value={firstName || ""} required readOnly />
          </div>
          <div className="inputContainer-reservation">
            <label>Surname</label>
            <input type="text" value={lastName || ""} required readOnly />
          </div>
          <div className="inputContainer-reservation">
            <label>Booking Date</label>
            <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} required />
          </div>
          <div className="inputContainer-reservation">
            <label>Event</label>
            <input type="text" value={eventDetails.eventName || ""} required readOnly />
          </div>
          <div className="inputContainer-reservation">
            <label>Total Price</label>
            <input type="number" value={totalPrice || ""} required readOnly />
          </div>
          <button type="button" className="inputButton" onClick={handlePaymentClick}>
            Book Now
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}