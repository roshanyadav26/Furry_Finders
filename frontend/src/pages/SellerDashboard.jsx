import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const SellerDashboard = () => {
  const [type, setType] = useState('pet');
  const [formData, setFormData] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        alert('You must be logged in as a seller first!');
        return;
      }
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const endpoint = type === 'pet' ? '/api/pets' : '/api/products';
      await axios.post(endpoint, formData, config);
      alert('Successfully uploaded listing!');
    } catch (error) {
      alert('Upload failed. ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '50px' }}>
        <h2>Seller Dashboard</h2>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '10px', marginBottom: '20px' }}>
          <option value="pet">Sell a Pet</option>
          <option value="product">Sell a Product</option>
        </select>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={{ padding: '10px' }} />
          {type === 'pet' ? (
             <>
               <input type="text" name="type" placeholder="Type (Dog/Cat)" onChange={handleChange} required style={{ padding: '10px' }} />
               <input type="text" name="breed" placeholder="Breed" onChange={handleChange} style={{ padding: '10px' }} />
               <input type="number" name="age" placeholder="Age" onChange={handleChange} style={{ padding: '10px' }} />
             </>
          ) : (
             <input type="text" name="category" placeholder="Category (Food/Toys)" onChange={handleChange} required style={{ padding: '10px' }} />
          )}
          <input type="number" name="price" placeholder="Price" onChange={handleChange} required style={{ padding: '10px' }} />
          <textarea name="description" placeholder="Description" onChange={handleChange} style={{ padding: '10px' }}></textarea>
          <input type="text" name="image" placeholder="Image URL (temporary placeholder)" onChange={handleChange} style={{ padding: '10px' }} />
          <button type="submit" style={{ padding: '10px', background: '#e6654a', color: '#fff', border: 'none', cursor: 'pointer' }}>Post Listing</button>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboard;
