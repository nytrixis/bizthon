import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExploreFeatures from './components/ExploreFeatures';
import './components/card.css';
import Footer from './components/Footer';
import SharedBackground from './components/SharedBackground';
import LoginSignup from './components/LoginSignup';
import About from './components/About';
import ContactUs from './components/ContactUs';
import DoctorNavbar from './components/DoctorNavbar';
import LandingPage from './components/DoctorLandingPage';
import DoctorBg from './components/DoctorBg';

function App() {
  return (
    <Router>
      <div className="bg-background min-h-screen font-poppins">
        <Routes>
          <Route path="/" element={
            <>
            <Navbar />
            <SharedBackground>
              <HeroSection />
              <ExploreFeatures />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/about" element={<About />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/doctor' element={
            <>
            <DoctorNavbar />
            <DoctorBg>
              <LandingPage />
              <Footer />
            </DoctorBg>
            </>
          } />
        </Routes>
        
      </div>
    </Router>
  );
}
export default App;