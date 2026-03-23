import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      alert('Login failed. ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fff2ef 0%, #fdfbfb 100%)',
        padding: '40px 20px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px 30px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(230, 101, 74, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#2c3e50', fontSize: '28px', marginBottom: '10px' }}>Welcome Back</h1>
          <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Please login to your account</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{
                width: '100%', padding: '15px', border: '1px solid #e0e0e0',
                borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box',
                background: '#f9f9f9'
              }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{
                width: '100%', padding: '15px', border: '1px solid #e0e0e0',
                borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box',
                background: '#f9f9f9'
              }}
            />
            <button type="submit" style={{
              width: '100%', padding: '15px', background: '#e6654a', color: 'white',
              border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
              cursor: 'pointer', transition: 'background 0.3s', marginTop: '10px',
              boxShadow: '0 4px 10px rgba(230, 101, 74, 0.3)'
            }}>Login</button>
          </form>
          
          <p style={{ marginTop: '30px', color: '#7f8c8d', fontSize: '14px' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#e6654a', fontWeight: 'bold', textDecoration: 'none' }}>Sign up here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
