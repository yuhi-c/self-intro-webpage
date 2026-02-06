import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Password.css';
import { API_BASE_URL } from '../config';

const Password = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Remove the previous error message
    setIsSubmitting(true);

    try {
      // Used Render to manage password
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      const data = await response.json();

      setIsSubmitting(false);

      if (data.success) {
        navigate('/');
      } else {
        setError(data.message || 'Incorrect password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };


  return (
    <div id="password-main">
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>

      {isSubmitting && <p style={{ color: 'green' }}>Please wait a moment...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Password;
