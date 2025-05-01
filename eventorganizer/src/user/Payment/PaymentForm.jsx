import React, { useEffect, useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { toast, ToastContainer } from 'react-toastify';
 import './PaymentForm.css';
 
 export default function PaymentForm() {
   const navigate = useNavigate();
 
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [amount, setAmount] = useState('');
   const [phone, setPhone] = useState('');
   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
   const [reservationId, setReservationId] = useState('');
 
   useEffect(() => {
     const storedName = localStorage.getItem('name');
     const storedSurname = localStorage.getItem('surname');
     const storedAmount = localStorage.getItem('amount');
     const storedReservationId = localStorage.getItem('reservationId');
 
     if (storedName) setName(storedName);
     if (storedSurname) setSurname(storedSurname);
     if (storedAmount) setAmount(storedAmount);
     if (storedReservationId) setReservationId(storedReservationId);
   }, []);
 
   const handleStripeClick = async () => {
     localStorage.setItem('amount', amount);
     
     // Ruaj të dhënat e pagesës
     const paymentData = {
         name,
         surname,
         amount,
         phone,
         date,
         reservationId: Number(reservationId), // Ruaj ID-në e rezervimit
     };
 
     try {
         const response = await fetch('http://localhost:5091/api/Payment/AddPayment', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(paymentData), // Dërgo të dhënat e pagesës
         });
 
         if (response.ok) {
             const data = await response.json();
             localStorage.setItem('paymentId', data.paymentId); // Ruaj paymentId
             navigate('/stripe'); // Kaloni te forma e Stripe
         } else {
             const errorResponse = await response.json();
             toast.error('Failed to create payment: ' + errorResponse.title);
         }
     } catch (error) {
         console.error('Error:', error);
         toast.error('An error occurred while processing payment!');
     }
 };
 
 
   const handlePaymentSubmit = (e) => {
     e.preventDefault();
     handleStripeClick(); // Thirr handleStripeClick
   };
 
   return (
     <div className="paymentFormContainer">
       <div className="paymentFormBox">
         <h2>Payment Details</h2>
         <form onSubmit={handlePaymentSubmit}>
           <div className="inputContainerPayment">
             <label>Name</label>
             <input type="text" value={name || ""} readOnly />
           </div>
           <div className="inputContainerPayment">
             <label>Surname</label>
             <input type="text" value={surname || ""} readOnly />
           </div>
           <div className="inputContainerPayment">
             <label>Amount</label>
             <input type="number" value={amount || ""} readOnly />
           </div>
           <div className="inputContainerPayment">
             <label>Phone</label>
             <input 
               type="tel" 
               value={phone} 
               onChange={(e) => setPhone(e.target.value)} 
               required 
             />
           </div>
           <div className="inputContainerPayment">
             <label>Date</label>
             <input 
               type="date" 
               value={date} 
               onChange={(e) => setDate(e.target.value)} 
               readOnly
             />
           </div>
           <button type="submit" className="inputButtonPayment">Pay Now</button>
           <ToastContainer />
         </form>
       </div>
     </div>
   );
 }