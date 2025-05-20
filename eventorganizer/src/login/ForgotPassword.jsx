import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (ev) => {
    const value = ev.target.value;
    setEmail(value);
    setEmailError('');
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Email is required!', {
        className: 'toast-error-custom',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5091/api/Users/ForgotPassword', { email });
      if (response.status === 200) {
        toast.success('Password reset instructions have been sent to your email!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 404) {
        toast.error('Email not found!', {
          className: 'toast-error-custom',
        });
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="mainContainer">
      <button className="back-Button" onClick={handleBack}>
        ← Back
      </button>
      <div className="loginBox">
        <div className='titleContainer'>
          <h2>Forgot Password</h2>
        </div>
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your email"
            onChange={handleInputChange}
            className="inputBox"
          />
          {emailError && <label className="errorLabel">{emailError}</label>}
        </div>
        <div className="inputContainer">
          <input 
            className="inputButton" 
            type="button" 
            onClick={handleSubmit} 
            value="Reset Password" 
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword; 