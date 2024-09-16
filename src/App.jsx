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
import SOSPage from './components/SOS';
import Dashboard from './components/Dashboard';
import PredictionComponent from './components/PredictionComponent';
import DocumentSentinel from './components/DocumentSentinel';
import RetrieveDocument from './components/RetrieveDocument';
import ChemistNavbar from './components/ChemistNavbar';
import ChemistBg from './components/ChemistBg';
import ChemistLandingPage from './components/ChemistLandingPage';
import PatientNavbar from './components/PatientNavbar';
import PatientBg from './components/PatientBg';
import PatientLandingPage from './components/PatientLandingPage';
import AppointmentForm from './components/AppointmentForm';
import VideoCallPage from './components/VideoCallPage';

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
          <Route path="/login" element={
            <>
            <Navbar />
            <SharedBackground>
              <LoginSignup />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path="/about" element={
            <>
            <Navbar />
            <SharedBackground>
              <About />
            </SharedBackground>
            </>
          } />
          <Route path="/contact" element={
            <>
            <Navbar />
            <SharedBackground>
              <ContactUs />
            </SharedBackground>
            </>
          } />
          <Route path='/doctor' element={
            <>
            <DoctorNavbar />
            <DoctorBg>
              <LandingPage />
              <Footer />
            </DoctorBg>
            </>
          } />
          <Route path='/chemist' element={
            <>
            <ChemistNavbar />
            <ChemistBg>
              <ChemistLandingPage />
              <Footer />
            </ChemistBg>
            </>
          } />
          <Route path='/patient' element={
            <>
            <PatientNavbar />
            <PatientBg>
              <PatientLandingPage />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path='/appointment' element={
            <>
            <PatientNavbar />
            <PatientBg>
              <AppointmentForm />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path="/:sessionId" element={
            <>
            <PatientNavbar />
            <PatientBg>
              <VideoCallPage />
              <Footer />
            </PatientBg>
            </>
          } />
          <Route path='/sos' element={
            <>
            <Navbar />
            <SharedBackground>
              <SOSPage />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path='/dashboard' element={
            <>
            <Navbar />
            <SharedBackground>
              <Dashboard />
              <Footer />
            </SharedBackground>
            </>
          } />

          <Route path='/prediction' element={
            <>
            <Navbar />
            <SharedBackground>
              <PredictionComponent />
              <Footer />
            </SharedBackground>
            </>
          } />
          <Route path='/docsen' element={
            <>
            <Navbar />
            <SharedBackground>
              <DocumentSentinel />
              <Footer />
            </SharedBackground>
            </>
          } />

          <Route path='/retrieve' element={
            <>
            <Navbar />
            <SharedBackground>
              <RetrieveDocument />
              <Footer />
            </SharedBackground>
            </>
          } />
        </Routes>
        
      </div>

    </Router>
  );
}
export default App;