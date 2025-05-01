import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importo useNavigate
import { toast, ToastContainer } from 'react-toastify';
import './UserReservation.css';

export default function UserReservation() {
  const location = useLocation();
  const eventDetails = location.state || {};
  const navigate = useNavigate(); // Inicializo useNavigate

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

    fetch('https://localhost:7214/api/Events/GetAllList')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleEventChange = (e) => {
    const selectedEvent = events.find((event) => event.id === Number(e.target.value));
    if (selectedEvent) {
      setEventID(selectedEvent.id);
      setTotalPrice(Number(selectedEvent.price));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      name: firstName,
      surname: lastName,
      reservationDate,
      totalPrice,
      userID: Number(userId),
      eventID,
    };

    try {
      const response = await fetch('https://localhost:7214/api/Reservation/AddReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        toast.success('Rezervimi u krijua me sukses!');
        setTimeout(() => navigate('/'), 2000); // Ridrejto në Home pas 2 sekondash
      } else {
        toast.error(`Data ${reservationDate} për këtë event është e zënë!`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ka ndodhur një gabim.');
    }
  };

  return (
    <div className="reservationContainer">
      <div className="reservationBox">
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>Emri</label>
            <input type="text" value={firstName || ""} required readOnly />
          </div>
          <div className="inputContainer">
            <label>Mbiemri</label>
            <input type="text" value={lastName || ""} required readOnly />
          </div>
          <div className="inputContainer">
            <label>Data e Rezervimit</label>
            <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} required />
          </div>
          <div className="inputContainer">
            <label>Eventi</label>
            <input type="text" value={eventDetails.eventName || ""} required readOnly />
          </div>
          <div className="inputContainer">
            <label>Çmimi Total</label>
            <input type="number" value={totalPrice || ""} required readOnly />
          </div>
          <button type="submit" className="inputButton">Krijo Rezervimin</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}