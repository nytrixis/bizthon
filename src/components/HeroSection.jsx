import React from 'react';
import logo from '../assets/image.png';
import bg from '../assets/Kawach.jpg';

const HeroSection = () => {
  return (
    <div className="relative h-screen pt-[30px]">
      {/* Background image */}
      

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-[110px]">
      <div className="relative">
          <div className="absolute inset-0 bg-black opacity-50 rounded-full transform translate-x-1 translate-y-3"></div>
          <div className="relative w-[310px] h-[310px] bg-white rounded-full flex items-center justify-center">
          <img src={logo} alt="Kawach Logo" className="w-[300px] h-[300px]" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mt-9">Protecting Lives, Empowering Care</h1>
        <h2 className="text-2xl text-white mt-2">A secure platform for instant medical assistance</h2>

        <button className="bg-red-600 text-white px-4 py-2 rounded mt-5 pl-5 flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-red-700" style={{ width: '250px', height: '80px' }}>
  <div className="flex items-center justify-center mb-1 pt-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
    <span className="font-bold text-2xl">SOS</span>
  </div>
  <span className="text-lg text-center">Speak: "Ambulance"</span>
</button>

        </div>
      </div>
  );
};

export default HeroSection;
