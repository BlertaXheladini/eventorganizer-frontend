import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const baseURL = 'https://localhost:7214/api/Users';

  const handleBack = () => {
    navigate('/login');
  };

  const handleRequestCode = async () => {
    try {
      setLoading(true);
      await axios.post(`${baseURL}/request-reset-code`, JSON.stringify(email), {
        headers: { 'Content-Type': 'application/json' },
      });
      setStep(2);
      setMessage('Code sent to your email.');
    } catch (err) {
      setMessage('Error sending code. Email may not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(`${baseURL}/verify-reset-code`, {
        email,
        code,
      });
      setStep(3);
      setMessage('Code verified. Please enter new password.');
    } catch (err) {
      setMessage('Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${baseURL}/reset-password`, {
        email,
        code,
        newPassword,
      });
      setMessage('Password reset successful.');
      setStep(1);
      setEmail('');
      setCode('');
      setNewPassword('');
    } catch (err) {
      setMessage('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <button className="back-Button" onClick={handleBack}>
        ← Back
      </button>
      <div className="forgot-container">
        <h2>Forgot Password</h2>
        {message && <p className="message">{message}</p>}

        {step === 1 && (
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleRequestCode} disabled={loading}>
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
