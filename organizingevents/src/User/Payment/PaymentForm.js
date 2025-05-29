// PaymentForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';
import './PaymentForm.css';

const stripePromise = loadStripe('pk_test_51Q0jhrP7aD7Wb7DXEJmQJtgQP0ueBOnYXwYXXggI4tVsfXrhn6N63UufYkbENoEMUq170OqvFoRecodLpz59OHfE00S5ZUzJ6x');

export default function PaymentForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reservationId, setReservationId] = useState('');
  const [showStripeForm, setShowStripeForm] = useState(false);

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

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('amount', amount);

    const paymentData = {
      name,
      surname,
      amount,
      phone,
      date,
      reservationId: Number(reservationId),
    };

    try {
      const response = await fetch('https://localhost:7214/api/Payment/AddPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('paymentId', data.id);
        setShowStripeForm(true); // Shfaq StripeForm
      } else {
        const errorResponse = await response.json();
        toast.error('Failed to create payment: ' + errorResponse.title);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing payment!');
    }
  };

  if (showStripeForm) {
    return (
      <Elements stripe={stripePromise}>
        <StripeForm />
      </Elements>
    );
  }

  return (
    <div className="paymentFormContainer">
      <div className="paymentFormBox">
        <h2>Payment Details</h2>
        <form onSubmit={handlePaymentSubmit}>
          {/* Fushat e formularit mbeten të njëjta */}
          <div className="inputContainerPayment">
            <label>Name</label>
            <input type="text" value={name || ''} readOnly />
          </div>
          <div className="inputContainerPayment">
            <label>Surname</label>
            <input type="text" value={surname || ''} readOnly />
          </div>
          <div className="inputContainerPayment">
            <label>Amount</label>
            <input type="number" value={amount || ''} readOnly />
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
            <input type="date" value={date} readOnly />
          </div>
          <button type="submit" className="inputButtonPayment">
            Proceed to Payment
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
