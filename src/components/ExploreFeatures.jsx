import React from 'react';
import { Link } from 'react-router-dom';
import feature1 from '../assets/feature1.jpg';
import feature2 from '../assets/feature2.jpg';
import feature3 from '../assets/feature3.jpg';
import bg from '../assets/Kawach.jpg';
import logo from '../assets/logo.png';
import image from '../assets/image.png';

const FeatureCard = ({ image, title, description, link, className }) => (
  <div className={`w-1/3 p-4 ${className}`}>
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">{description}</p>
        <Link to={link} className="bg-primary text-white px-4 py-2 rounded">
          Learn More
        </Link>
      </div>
    </div>
  </div>
);

const ExploreFeatures = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-[#04448A] opacity-65"></div>
      </div> */}
      <div className="relative z-10 pt-[100px]">
        <h2 className="text-4xl font-bold text-white text-center mb-[20px]">Explore Features</h2>
        <h4 className="text-2xl font-normal text-white text-center mb-[80px]">Sail through the best of our services</h4>
        <div className="flex justify-between w-full">
          <FeatureCard 
            image={feature1}
            title="Virtual Consultation"
            description="1 on 1 virtual meet and 24/7 on call mental health support."
            link="/feature1"
            className="pl-20"
          />
          <FeatureCard 
            image={feature3}
            title="Immediate SOS Response"
            description="Earliest Ambulance Dispatch with medical team to tracked geolocation."
            link="/feature2"
          />
          <FeatureCard 
            image={feature2}
            title="Decentralized Medical Records"
            description="Access and view your health history and medical reports anywhere, anytime."
            link="/feature3"
            className="pr-20"
          />
        </div>
      </div>
      <div className="py-12">
  {/* <div className="container mx-auto text-center mt-20">
    <img src={image} alt="Kawach Logo" className="w-[65px] h-[65px] mx-auto mb-4" />
    <p className="text-lg text-gray-400">Empowering you to take control of your health, anytime, <br />anywhere.</p>
  </div> */}
</div>

    </div>

    
  );
};

export default ExploreFeatures;
