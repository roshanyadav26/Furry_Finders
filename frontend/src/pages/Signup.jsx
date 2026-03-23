import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password, role });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      alert('Signup failed. ' + (error.response?.data?.message || error.message));
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
          <h1 style={{ color: '#2c3e50', fontSize: '28px', marginBottom: '10px' }}>Create Account</h1>
          <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Join the Furry Finders community</p>
          
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{
                width: '100%', padding: '15px', border: '1px solid #e0e0e0',
                borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', background: '#f9f9f9'
              }} 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{
                width: '100%', padding: '15px', border: '1px solid #e0e0e0',
                borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', background: '#f9f9f9'
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
                borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', background: '#f9f9f9'
              }} 
            />
            
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '14px', color: '#7f8c8d', fontWeight: 'bold' }}>I am a:</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                style={{
                  width: '100%', padding: '15px', marginTop: '8px', border: '1px solid #e0e0e0',
                  borderRadius: '10px', fontSize: '16px', outline: 'none', boxSizing: 'border-box', background: '#f9f9f9'
                }}
              >
                <option value="buyer">Buyer (Looking for pets)</option>
                <option value="seller">Seller (Listing pets/products)</option>
              </select>
            </div>

            <button type="submit" style={{
              width: '100%', padding: '15px', background: '#e6654a', color: 'white',
              border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
              cursor: 'pointer', transition: 'background 0.3s', marginTop: '10px',
              boxShadow: '0 4px 10px rgba(230, 101, 74, 0.3)'
            }}>Sign Up</button>
          </form>
          
          <p style={{ marginTop: '30px', color: '#7f8c8d', fontSize: '14px' }}>
            Already have an account? <Link to="/login" style={{ color: '#e6654a', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
