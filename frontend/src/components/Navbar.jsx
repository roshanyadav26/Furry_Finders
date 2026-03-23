import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const role = userInfo?.role;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <header>
      <div className="logo">
        <i className="fa-solid fa-paw"></i> FurryFinders
      </div>
      <nav>
        <ul style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <li><Link to="/">Home</Link></li>
          
          {/* Seller Links */}
          {role === 'seller' && (
            <>
              <li><Link to="/dashboard" style={{ fontWeight: 'bold', color: '#e6654a' }}>Seller Dashboard</Link></li>
              <li><Link to="/categories">All Pet Listings</Link></li>
            </>
          )}

          {/* Buyer & Guest Links */}
          {role !== 'seller' && (
            <>
              <li><Link to="/categories" style={{ fontWeight: 'bold', color: '#e6654a' }}>Available Pets</Link></li>
              <li><a href="/#categories-section" style={{ textDecoration: 'none', color: 'inherit' }}>Categories</a></li>
              <li><a href="/#vet-chat" style={{ textDecoration: 'none', color: 'inherit' }}>Vet Chat</a></li>
              <li><a href="/#pet-shops" style={{ textDecoration: 'none', color: 'inherit' }}>Nearby Shops</a></li>
            </>
          )}
          
          {userInfo ? (
            <>
              <li><span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Hi, {userInfo.name} ({role})</span></li>
              <li>
                 <button onClick={handleLogout} style={{ padding: '8px 12px', cursor: 'pointer', background: '#e6654a', color: 'white', border: 'none', borderRadius: '4px' }}>
                   Logout
                 </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login/Sign Up</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
