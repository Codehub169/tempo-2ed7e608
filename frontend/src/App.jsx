import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // To be created
import HomePage from './pages/HomePage';
import DonationPage from './pages/DonationPage'; // To be created
import ContactPage from './pages/ContactPage'; // To be created

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonationPage />} />
        {/* Route for specific cause donation, e.g., /donate/:causeId */}
        <Route path="/donate/:causeId" element={<DonationPage />} /> 
        <Route path="/contact" element={<ContactPage />} />
        {/* Add more routes as needed, e.g., for a 404 page */}
      </Routes>
    </Layout>
  );
}

export default App;
