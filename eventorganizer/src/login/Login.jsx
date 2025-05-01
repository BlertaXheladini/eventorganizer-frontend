import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [FirstName,setFirstName] = useState('')
  const [LastName,setLastName] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ServerError, setServerError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (setter, errorSetter, validator) => (ev) => {
    const value = ev.target.value;
    setter(value);
    errorSetter('');
    if (validator) validator(value);
  };

  const onLoginClick = async () => {  
    const userData = {
      email: Email,
      password: Password
    };
  
    if (!Email) {
      toast.error('Email is required!');
      return;
    }
  
    if (!Password) {
      toast.error('Password is required!');
      return;
    }
  
    try {
      const response = await axios.post('https://localhost:7214/api/Users/Login', userData);
      if (response.status === 200) {
        const { roleId , userId , firstName , lastName} = response.data;
        console.log(response.data)
        localStorage.setItem('roleId', roleId);
        localStorage.setItem('userId',userId);
        localStorage.setItem('firstName',firstName)
        localStorage.setItem('lastName',lastName)
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        toast.error('An error occurred: ' + response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="mainContainer">
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