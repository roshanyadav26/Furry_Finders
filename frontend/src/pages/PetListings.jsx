import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const dummyBreeds = {
  dog: [
    { _id: 'd1', name: 'Golden Retriever Puppy', type: 'dog', breed: 'Golden Retriever', price: 500, description: 'Friendly, intelligent, and energetic family dog.', image: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=600&auto=format&fit=crop' },
    { _id: 'd2', name: 'German Shepherd Guard', type: 'dog', breed: 'German Shepherd', price: 650, description: 'Extremely loyal and highly trained.', image: 'https://images.unsplash.com/photo-1589924691995-400dc9cecb58?q=80&w=600&auto=format&fit=crop' },
    { _id: 'd3', name: 'Husky Pup', type: 'dog', breed: 'Siberian Husky', price: 700, description: 'Beautiful blue eyes, loves the cold and running.', image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=600&auto=format&fit=crop' }
  ],
  cat: [
    { _id: 'c1', name: 'Persian Kitten', type: 'cat', breed: 'Persian', price: 400, description: 'Fluffy, gentle, and very affectionate.', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop' },
    { _id: 'c2', name: 'Siamese Cat', type: 'cat', breed: 'Siamese', price: 300, description: 'Vocal, smart, and highly playful companion.', image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=600&auto=format&fit=crop' }
  ],
  rabbit: [
    { _id: 'r1', name: 'Lop Ear Bunny', type: 'rabbit', breed: 'Holland Lop', price: 80, description: 'Cute floppy ears, gentle and quiet.', image: 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e50d6?q=80&w=600&auto=format&fit=crop' }
  ],
  cow: [
    { _id: 'cw1', name: 'Holstein Cow', type: 'cow', breed: 'Holstein', price: 1200, description: 'Excellent milk producer, healthy and vaccinated.', image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600&auto=format&fit=crop' }
  ],
  buffalo: [
    { _id: 'b1', name: 'Water Buffalo', type: 'buffalo', breed: 'Murrah', price: 1500, description: 'Strong and sturdy, high milk yield.', image: 'https://images.unsplash.com/photo-1596704107149-fb3be969018e?q=80&w=600&auto=format&fit=crop' }
  ],
  parrot: [
    { _id: 'p1', name: 'Macaw', type: 'parrot', breed: 'Blue and Gold Macaw', price: 900, description: 'Colorful, talkative, and very intelligent.', image: 'https://images.unsplash.com/photo-1552728089-571692ce3f6c?q=80&w=600&auto=format&fit=crop' }
  ]
};

const PetListings = () => {
  const { type } = useParams();
  const [pets, setPets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/pets');
        let fetchedPets = res.data;
        
        // Filter by animal type if accessed via a category route
        if (type) {
          fetchedPets = fetchedPets.filter(p => p.type?.toLowerCase() === type.toLowerCase());
        }

        // If the database has no pets for this view, inject our beautiful dummy data!
        if (fetchedPets.length === 0) {
          if (type && dummyBreeds[type.toLowerCase()]) {
            setPets(dummyBreeds[type.toLowerCase()]);
          } else if (!type) {
            // No specific type, show everything
            setPets(Object.values(dummyBreeds).flat());
          } else {
            setPets([]);
          }
        } else {
          setPets(fetchedPets);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setLoading(false);
      }
    };
    fetchPets();
  }, [type]);

  const displayTitle = type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Breeds Available` : 'All Pets & Breeds Available';

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '30px', borderBottom: '3px solid #e6654a', display: 'inline-block', paddingBottom: '10px' }}>
          {displayTitle}
        </h1>
        {loading ? (
          <h2>Loading available pets...</h2>
        ) : pets.length === 0 ? (
            <div style={{ padding: '20px', background: '#fff3cd', color: '#856404', borderRadius: '5px' }}>
               No pets available right now because the database is currently empty. <br />
               <b>Be the first to list a pet by logging in and navigating to the Dashboard!</b>
            </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {pets.map((pet) => (
              <div key={pet._id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '15px', 
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)' }}
              >
                {/* Fallback image logic */}
                <img 
                  src={pet.image || "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=400&auto=format&fit=crop"} 
                  alt={pet.name} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 10px', color: '#2c3e50', fontSize: '22px' }}>{pet.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#e6654a', background: '#fff2ef', padding: '5px 10px', borderRadius: '20px', fontSize: '14px' }}>{pet.breed || pet.type}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#27ae60' }}>${pet.price}</span>
                  </div>
                  <p style={{ color: '#7f8c8d', fontSize: '15px', lineHeight: '1.4', marginBottom: '20px' }}>{pet.description}</p>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ 
                      flex: 1, padding: '10px', background: '#e6654a', color: 'white', 
                      border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
                    }}>
                      Contact Seller
                    </button>
                    <button style={{ 
                      flex: 1, padding: '10px', background: '#fff', color: '#e6654a', 
                      border: '2px solid #e6654a', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
                    }}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PetListings;
