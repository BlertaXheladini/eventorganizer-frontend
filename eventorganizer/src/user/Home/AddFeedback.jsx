import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import { FaStar } from 'react-icons/fa'; // Importo ikonën FaStar për yje
 import './AddFeedback.css'; // Krijo dhe stilizimin tënd këtu
 
 const AddFeedback = () => {
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [comments, setComments] = useState('');
   const [rating, setRating] = useState(0);
   const [eventsId, setEventsId] = useState('');
   const [events, setEvents] = useState([]);
   const [message, setMessage] = useState('');
 
   // Ngarko të gjitha eventet për dropdown
   useEffect(() => {
     const fetchEvents = async () => {
       try {
         const response = await axios.get('http://localhost:5091/api/Events/GetAllList');
         setEvents(response.data);
       } catch (error) {
         console.error('Error loading events:', error);
       }
     };
 
     fetchEvents();
   }, []);
 
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     try {
       const feedbackData = {
         name,
         surname,
         comments,
         rating,
         eventsId,
       };
 
       const response = await axios.post('http://localhost:5091/api/Feedback/Add', feedbackData);
       setMessage('Feedback submitted successfully!');
       // Pasi të dërgoni feedback-in, mund të pastroni fushat
       setName('');
       setSurname('');
       setComments('');
       setRating(0);
       setEventsId('');
     } catch (error) {
       setMessage('An error occurred while submitting the feedback.');
     }
   };
 
   // Funksioni për të shfaqur yje për rating
   const renderStars = () => {
     const stars = [];
     for (let i = 1; i <= 5; i++) {
       stars.push(
         <FaStar
           key={i}
           size={30}
           color={i <= rating ? "#ffc107" : "#e4e5e9"}
           onClick={() => setRating(i)} // Mundëson që përdoruesi të zgjedhë yjet
           style={{ cursor: 'pointer' }}
         />
       );
     }
     return stars;
   };
 
   return (
     <div className="feedback-form-container">
       <h2>Give Us Your Feedback...</h2>
       <form onSubmit={handleSubmit}>
         <div className="form-group-feedback">
           <label htmlFor="name">Name:</label>
           <input
             type="text"
             id="name"
             value={name}
             onChange={(e) => setName(e.target.value)}
             required
           />
         </div>
 
         <div className="form-group-feedback">
           <label htmlFor="surname">Surname:</label>
           <input
             type="text"
             id="surname"
             value={surname}
             onChange={(e) => setSurname(e.target.value)}
             required
           />
         </div>
 
         <div className="form-group-feedback">
           <label htmlFor="comments">Comments:</label>
           <textarea
             id="comments"
             value={comments}
             onChange={(e) => setComments(e.target.value)}
             required
           />
         </div>
 
         <div className="form-group-feedback">
           <label htmlFor="rating">Rating:</label>
           <div>{renderStars()}</div> {/* Shfaq yjet për rating */}
         </div>
 
         <div className="form-group-feedback">
           <label htmlFor="eventsId">Event:</label>
           <select
             id="eventsId"
             value={eventsId}
             onChange={(e) => setEventsId(e.target.value)}
             required
           >
             <option value="">Select Event</option>
             {events.map((event) => (
               <option key={event.id} value={event.id}>
                 {event.eventName}
               </option>
             ))}
           </select>
         </div>
 
         <button type="submit" className="btn-feedback">Submit</button>
       </form>
       {message && <p className="message-feedback">{message}</p>}
     </div>
   );
 };
 
 export default AddFeedback;