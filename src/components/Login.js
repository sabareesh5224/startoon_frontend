import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://st-hbkn.onrender.com/login', loginData);
      alert('Login successful');
      if (response.data.isAdmin) {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = `/profile?email=${loginData.email}`; // Pass email via URL
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email"
          className="form-input"
          placeholder="Email" 
          onChange={handleChange} 
          value={loginData.email}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password:</label>
        <input 
          type="password" 
          name="password" 
          id="password"
          className="form-input"
          placeholder="Password" 
          onChange={handleChange} 
          value={loginData.password}
        />
      </div>
      
      <div className="button-container">
        <button type="submit" className="submit-button">Sign in</button>
      </div>
    </form>
  );
};

export default Login;
