import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isSeller = userInfo?.role === 'seller';

  if (isSeller) {
    return (
      <>
        <Navbar />
        <section className="hero" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '100px 20px' }}>
          <div className="content" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>Seller <br /> Portal</h1>
            <p style={{ fontSize: '20px', marginTop: '10px' }}>Welcome to the Furry Finders Seller Network.</p>
            <p>Manage your pet listings, update product inventory, and connect with thousands of buyers looking to adopt or purchase new products.</p>
            <div style={{ marginTop: '30px' }}>
              <Link to="/dashboard">
                <button style={{ padding: '15px 30px', fontSize: '18px', background: '#e6654a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Post a New Listing
                </button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="content">
          <h1>Furry <br /> Finders</h1>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>Find your new best friend or list a pet for adoption today.</p>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>The premier marketplace connecting loving homes with verified sellers.</p>
          <p style={{ fontSize: '18px' }}>Discover pets, high-quality supplies, and expert vet advice.</p>
        </div>
        <div className="image-container">
          <img src="/assets/Group 3 (1).svg" alt="Cute Puppy" width="500px" height="500px" />
        </div>
        <div className="right-bg"></div>
      </section>

      <section id="categories-section" className="Categories">
        <div className="categories">
          <h1>Categories</h1>
        </div>
        <div className="category-imgs">
          <a href="/categories/dog" className="category-link">
            <div className="category">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/dog-img(1).png" className="animal-img" />
            </div>
          </a>
          <a href="/categories/cat" className="category-link">
            <div className="category">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/cat.png" className="animal-img" />
            </div>
          </a>
          <a href="/categories/rabbit" className="category-link">
            <div className="category">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/rabbit.png" className="animal-img" />
            </div>
          </a>
          <a href="/categories/cow" className="category-link">
            <div className="category">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/cow.png" className="animal-img" />
            </div>
          </a>
          <a href="/categories/buffalo" className="category-link">
            <div className="category">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/buffalo.png" className="animal-img" />
            </div>
          </a>
          <a href="/categories/parrot" className="category-link">
            <div className="category">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/parrot.png" className="animal-img" />
            </div>
          </a>
        </div>
      </section>

      <section id="vet-chat" className="Veterian-Doctor">
        <div className="content1">
          <h3>Meet Our Virtual Veterinarian</h3>
        </div>
        <div className="content-class">
          <div className="content2">
            <div className="category1">
              <img src="/assets/Group 4.svg" className="category-box1" />
              <img src="/assets/pet-doctor (1).svg" className="vetdoc-img" />
            </div>
          </div>
          <div className="content3">
            <h2>Meet Our Caring Expert</h2>
            <div className="chatbutton">
              <div className="text-container">
                <div className="logo2">
                  <i className="fa-solid fa-briefcase-medical"></i>
                </div>
                <div className="bold">
                  <b>YOUR PETS HEALTH IS OUR PRIORITY!</b>
                </div>
              </div>
              <button>Click On The Chat Icon At The Bottom Right</button>
            </div>
          </div>
        </div>
      </section>

      <section id="pet-shops" className="Pet-Shop">
        <div className="pet-container">
          <div className="pet-content">
            <button style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
              <h3>
                <a href="https://www.google.com/maps/search/pet+shops+near+me/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Nearby Pet Shops
                </a>
              </h3>
            </button>
            <div className="text">Search Nearby Pet Shops!</div>
          </div>
          <div className="pet-image">
            <div className="category2">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/pet-shop.png" className="vetdoc-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="Footer">
        <div className="classes">
          <div className="class1">
            <ul>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Help Center</li>
              <li>FAQs</li>
              <li>How It Works</li>
            </ul>
          </div>
          <div className="class2">
            <div className="img">
              <img src="/assets/Group 4.svg" className="category-box" />
              <img src="/assets/Footer-img.svg" className="footer-img" />
            </div>
            <div className="foot-logo">
              <i className="fa-solid fa-paw"></i> FurryFinders
            </div>
          </div>
          <div className="class3">
            <ul>
              <li>Dog Care</li>
              <li>Privacy and Policy</li>
              <li>Popular Product</li>
              <li>Call Us</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
