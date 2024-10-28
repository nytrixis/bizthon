import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPolicy } from '../contracts/insurance';

const PolicyForm = ({ plan, onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        medicalHistory: '',
        contactNumber: '',
        email: '',
        address: '',
        emergencyContact: '',
        occupation: '',
        existingConditions: '',
        familyHistory: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const policyData = {
                ...formData,
                planId: plan.id,
                coverage: plan.coverage,
                premium: plan.premium,
                startDate: new Date().toISOString(),
                policyNumber: `POL-${Date.now()}`
            };
            
            const result = await createPolicy(policyData);
            onSubmit(policyData);
        } catch (error) {
            console.error('Error submitting policy application:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderFormStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <motion.input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="p-3 rounded bg-white bg-opacity-20 text-white w-full"
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                            <motion.input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="p-3 rounded bg-white bg-opacity-20 text-white w-full"
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                        </div>
                        <motion.input
                            type="text"
                            name="occupation"
                            placeholder="Occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                        <div className="grid grid-cols-2 gap-6">
                            <motion.input
                                type="tel"
                                name="contactNumber"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                className="p-3 rounded bg-white bg-opacity-20 text-white"
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                            <motion.input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="p-3 rounded bg-white bg-opacity-20 text-white"
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <motion.textarea
                            name="medicalHistory"
                            placeholder="Brief Medical History"
                            value={formData.medicalHistory}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white h-32"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                        <motion.textarea
                            name="existingConditions"
                            placeholder="Existing Medical Conditions (if any)"
                            value={formData.existingConditions}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white h-32"
                            whileFocus={{ scale: 1.02 }}
                        />
                        <motion.textarea
                            name="familyHistory"
                            placeholder="Family Medical History"
                            value={formData.familyHistory}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white h-32"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <motion.input
                            type="text"
                            name="address"
                            placeholder="Residential Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                        <motion.input
                            type="tel"
                            name="emergencyContact"
                            placeholder="Emergency Contact Number"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                    </div>
                );
        }
    };

    return (
        <motion.div
            className="mt-12 bg-white bg-opacity-10 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                    Apply for {plan.name}
                </h3>
                <motion.button
                    onClick={onBack}
                    className="text-white underline"
                    whileHover={{ scale: 1.05 }}
                >
                    Choose Different Plan
                </motion.button>
            </div>

            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg mb-6">
                <p className="text-white">Selected Plan: {plan.name} - ${plan.premium}/month</p>
                <p className="text-gray-300">Coverage Amount: ${plan.coverage}</p>
            </div>

            <div className="flex justify-center mb-8">
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className={`w-1/3 h-2 mx-1 rounded ${
                            step <= currentStep ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode='wait'>
                    {renderFormStep()}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                        <motion.button
                            type="button"
                            onClick={() => setCurrentStep(step => step - 1)}
                            className="bg-gray-500 text-white px-6 py-2 rounded"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Previous
                        </motion.button>
                    )}
                    
                    {currentStep < 3 ? (
                        <motion.button
                            type="button"
                            onClick={() => setCurrentStep(step => step + 1)}
                            className="bg-blue-500 text-white px-6 py-2 rounded ml-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Next
                        </motion.button>
                    ) : (
                        <motion.button
                            type="submit"
                            className={`bg-green-500 text-white px-6 py-2 rounded ml-auto ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </motion.button>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

export default PolicyForm;
