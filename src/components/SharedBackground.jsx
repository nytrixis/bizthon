import React from 'react';
import bg from '../assets/Kawach.jpg';

const SharedBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-[#04448A] opacity-65"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SharedBackground;
