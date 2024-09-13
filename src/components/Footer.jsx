import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center pl-10">
          <img src={logo} alt="Kawach Logo" className="h-12 w-12 mr-2" />
          <span className="text-xl font-semibold text-text">KAWACH</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/" className="hover:text-accent">Campaigns</Link>
          <Link to="/" className="hover:text-accent">Email</Link>
          <Link to="/" className="hover:text-accent">Marketing</Link>
          <Link to="/" className="hover:text-accent">Offline</Link>
          <Link to="/" className="hover:text-accent">Contact Us</Link>
          <Link to="/" className="hover:text-accent">FAQs</Link>

        </div>
        <div className="text-sm pr-10">
          &copy; {new Date().getFullYear()} KAWACH. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
