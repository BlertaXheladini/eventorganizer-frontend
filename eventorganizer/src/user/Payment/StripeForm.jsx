 import React, { useEffect, useState } from 'react';
 import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
 import { useNavigate } from 'react-router-dom';
 import { toast, ToastContainer } from 'react-toastify';
 import './StripeForm.css';
 
 export default function StripeForm() {
   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();
 
   const [amount, setAmount] = useState(0);
   const [paymentId, setPaymentId] = useState('');
   const [email, setEmail] = useState('');
   const [description, setDescription] = useState('');
   const [paymentSuccess, setPaymentSuccess] = useState(false);
 
   useEffect(() => {
     const storedAmount = localStorage.getItem('amount');
     const storedPaymentId = localStorage.getItem('paymentId');
 
     if (storedAmount) setAmount(Number(storedAmount));
     if (storedPaymentId) setPaymentId(storedPaymentId);
   }, []);
 
   const handleSubmit = async (event) => {
     event.preventDefault();
 
     if (!stripe || !elements) {
       toast.error('Stripe.js has not loaded yet.');
       return;
     }
 
     const cardElement = elements.getElement(CardElement);
 
     try {
       // Krijo një Payment Intent në server
       const response = await fetch('https://localhost:7214/api/Stripe/CreatePaymentIntent', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ amount, description }),
       });
 
       const { clientSecret } = await response.json();
 
       // Konfirmo pagesën me Stripe
       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: cardElement,
           billing_details: {
             email: email,
           },
         },
       });
 
       if (paymentResult.error) {
         toast.error(paymentResult.error.message);
       } else {
         if (paymentResult.paymentIntent.status === 'succeeded') {
           // Vendosni gjendjen e pagesës si të suksesshme
           setPaymentSuccess(true);
           // Mund të hiqni të dhënat nga localStorage nëse dëshironi
           localStorage.removeItem('amount');
           localStorage.removeItem('paymentId');
           // Navigoni te faqja kryesore pas një vonese
           setTimeout(() => {
             navigate('/');
           }, 3000); // Navigon pas 3 sekondash
         }
       }
     } catch (error) {
       console.error('Error:', error);
       toast.error('An error occurred during payment processing.');
     }
   };
 
   if (paymentSuccess) {
     return (
       <div className="stripeFormContainer">
         <div className="stripeFormBox">
           <h2>Payment Successful!</h2>
           <p>Your payment was completed successfully.</p>
           <p>You will be redirected to the home page shortly.</p>
         </div>
       </div>
     );
   }
 
   return (
     <div className="stripeFormContainer">
       <div className="stripeFormBox">
         <h2>Enter Payment Details</h2>
         <form onSubmit={handleSubmit}>
           <div className="inputContainerStripe">
             <label>Description</label>
             <input
               type="text"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
             />
           </div>
           <div className="inputContainerStripe">
             <label>Amount</label>
             <input type="number" value={amount} readOnly />
           </div>
           <div className="inputContainerStripe">
             <label>Email</label>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
             />
           </div>
           <div className="inputContainerStripe">
             <label>Card Details</label>
             <CardElement />
           </div>
           <button type="submit" className="inputButtonStripe" disabled={!stripe}>
             Submit Payment
           </button>
           <ToastContainer />
         </form>
       </div>
     </div>
   );
 }