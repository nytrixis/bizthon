// src/components/insurance/PlanCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaMedkit, FaHospital } from 'react-icons/fa';

const PlanCard = ({ plan, onSelect, isSelected }) => {
    const featureIcons = {
        'Basic medical coverage': <FaMedkit />,
        'Emergency care': <FaHospital />,
        'Global coverage': <FaShieldAlt />
    };

    return (
        <motion.div
            className={`${
                isSelected 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-400' 
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
            } p-6 rounded-xl relative overflow-hidden transition-all duration-300`}
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {isSelected && (
                <motion.div
                    className="absolute -top-2 -right-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    Selected Plan
                </motion.div>
            )}

            <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -mr-16 -mt-16"
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>

                <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.premium}</span>
                    <span className="text-gray-300 ml-2">/month</span>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-6">
                    <p className="text-white font-semibold">Total Coverage</p>
                    <p className="text-3xl font-bold text-blue-400">${plan.coverage.toLocaleString()}</p>
                </div>

                <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            className="flex items-center text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <span className="text-blue-400 mr-2">
                                {featureIcons[feature] || <FaCheckCircle />}
                            </span>
                            {feature}
                        </motion.div>
                    ))}
                </div>

                <motion.button 
                    onClick={onSelect}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
                        isSelected 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white shadow-lg`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSelected ? 'Selected' : 'Choose Plan'}
                </motion.button>

                {!isSelected && (
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Click to select this plan
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default PlanCard;
