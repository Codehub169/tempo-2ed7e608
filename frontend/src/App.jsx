import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import DonationPage from '@/pages/DonationPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonationPage />} />
        {/* Route for specific cause donation, e.g., /donate/:causeId */}
        <Route path="/donate/:causeId" element={<DonationPage />} /> 
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add more routes as needed, e.g., for a 404 page */}
      </Routes>
    </Layout>
  );
}

export default App;
