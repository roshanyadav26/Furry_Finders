import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SellerDashboard from './pages/SellerDashboard';
import PetListings from './pages/PetListings';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<SellerDashboard />} />
        <Route path="/categories" element={<PetListings />} />
        <Route path="/categories/:type" element={<PetListings />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;
