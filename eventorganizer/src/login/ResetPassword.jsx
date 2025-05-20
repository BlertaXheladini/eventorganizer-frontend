import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleInputChange = (setter, errorSetter) => (ev) => {
    const value = ev.target.value;
    setter(value);
    errorSetter('');
  };

  const handleSubmit = async () => {
    if (!password) {
      toast.error('Password is required!', {
        className: 'toast-error-custom',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', {
        className: 'toast-error-custom',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5091/api/Users/ResetPassword', {
        token,
        newPassword: password
      });

      if (response.status === 200) {
        toast.success('Password has been reset successfully!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        toast.error('Invalid or expired token!', {
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
          <h2>Reset Password</h2>
        </div>
        <div className="inputContainer">
          <input
            type="password"
            value={password}
            placeholder="New Password"
            onChange={handleInputChange(setPassword, setPasswordError)}
            className="inputBox"
          />
          {passwordError && <label className="errorLabel">{passwordError}</label>}
        </div>
        <div className="inputContainer">
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm New Password"
            onChange={handleInputChange(setConfirmPassword, setConfirmPasswordError)}
            className="inputBox"
          />
          {confirmPasswordError && <label className="errorLabel">{confirmPasswordError}</label>}
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

export default ResetPassword; 