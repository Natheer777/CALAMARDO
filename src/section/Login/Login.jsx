import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;

    try {
      const authResponse = await axios.post('https://api.calamardoalicante.com/api/login', {
        name,
        password
      });

      if (!authResponse.data || !authResponse.data.access_token) {
        throw new Error('Token not found in the response');
      }

      const token = authResponse.data.access_token;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', token);
      navigate('/CALAMARDO/Dash');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container Contact">
      <h1 className='title_wel'>Login</h1>
      <form onSubmit={handleSubmit}>
          <input className='mt-5' type="text" name="name" value={formData.name} onChange={handleChange} placeholder='User name' required />
        <br />
          <input className='mt-4' type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required />
        <br />
        <button className='submit mt-5' type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
