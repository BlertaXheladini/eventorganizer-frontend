// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ServerError, setServerError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (setter, errorSetter) => (ev) => {
    const value = ev.target.value;
    setter(value);
    errorSetter('');
  };

  const onLoginClick = async () => {
    const userData = {
      email: Email,
      password: Password
    };

    
    if (!Email) {
      toast.error('Email is required!', {
        className: 'toast-error-custom',  // Klasa e personalizuar
      });
      return;
    }
    
    if (!Password) {
      toast.error('Password is required!', {
        className: 'toast-error-custom',  // Klasa e personalizuar
      });
      return;
    }
    


    try {
      const response = await axios.post('http://localhost:5091/api/Users/Login', userData);
      console.log(response);
      
      if (response.status === 200) {
        const { roleId, userId, firstName, lastName, AccessToken, RefreshToken } = response.data;
    
        // Ruaj të dhënat në localStorage
        localStorage.setItem('roleId', roleId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('accessToken', AccessToken);
        localStorage.setItem('refreshToken', RefreshToken);
    
        // Konfiguro axios për të përfshirë token-in në kërkesa të ardhshme
        axios.defaults.headers.common['Authorization'] = `Bearer ${AccessToken}`;
    
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    
     // Kontrollo nëse është gabim me status 400 ose 401
      if (error.response && error.response.status === 400) {
        toast.error('Email or password is incorrect!', {
          className: 'toast-error-custom',  // Klasa e personalizuar vetëm për këtë mesazh
        });
      } else if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access. Please try again!');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
    
    
  };

    // Funksioni për të kthyer në Home page
    const handleBack = () => {
      navigate('/');
    };

  return (
      <div className="mainContainer">
           {/* Butoni për kthim në Home */}
           <button className="back-Button" onClick={handleBack}>
        ← Back
      </button>
      <div className="loginBox">
        <div className='titleContainer'>
          <h2>Login</h2>
        </div>
        <div className="inputContainer">
          <input
            value={Email}
            placeholder="Email"
            onChange={handleInputChange(setEmail, setEmailError)}
            className="inputBox"
          />
          {emailError && <label className="errorLabel">{emailError}</label>}
        </div>
        <div className="inputContainer">
          <input
            type='password'
            value={Password}
            placeholder="Password"
            onChange={handleInputChange(setPassword, setPasswordError)}
            className="inputBox"
          />
          {passwordError && <label className="errorLabel">{passwordError}</label>}
        </div>
        <div className="inputContainer">
          <input className="inputButton" type="button" onClick={onLoginClick} value={'Log in'} />
        </div>
        <div className="registerContainer">
          <p>Don't have an account!</p>
          <input className="registerButton" type="button" value={'Register'} onClick={() => navigate('/register')} />
        </div>
        {ServerError && <label className="errorLabel">{ServerError}</label>}
      </div>
      <ToastContainer /> {/* Shto ToastContainer për të treguar njoftimet */}
    </div>
  );
};

export default Login;