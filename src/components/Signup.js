import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else if (userData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!userData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post('https://st-hbkn.onrender.com/signup', userData);
      alert('Signup successful');
      navigate('/login'); // Optionally navigate after signup
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Username:</label>
        <input 
          type="text" 
          name="name" 
          id="name"
          className="form-input"
          placeholder="Name" 
          onChange={handleChange} 
          value={userData.name}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email"
          className="form-input"
          placeholder="Email" 
          onChange={handleChange} 
          value={userData.email}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
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
          value={userData.password}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      <div className="form-group">
        <label className="form-label">Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              className="form-radio"
              onChange={handleChange}
              checked={userData.gender === 'Male'}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              className="form-radio"
              onChange={handleChange}
              checked={userData.gender === 'Female'}
            />
            Female
          </label>
        </div>
        {errors.gender && <span className="error-message">{errors.gender}</span>}
      </div>

      <div className="button-container">
        <button type="submit" className="submit-button">Signup</button>
      </div>
      
      <div className="login-prompt">
        <p>Already signed up? <button type="button" className="login-button" onClick={handleLoginClick}>Sign in</button></p>
      </div>
    </form>
  );
};

export default Signup;
