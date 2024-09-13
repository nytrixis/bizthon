import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExploreFeatures from './components/ExploreFeatures';
import './components/card.css';
import Footer from './components/Footer';
import SharedBackground from './components/SharedBackground';
function App() {
  return (
    <Router>
      <div className="bg-background min-h-screen font-poppins">
        <Navbar />
        <SharedBackground>
        <HeroSection />
        <ExploreFeatures />

        <Footer />
        </SharedBackground>
      </div>
    </Router>
  );
}
export default App;