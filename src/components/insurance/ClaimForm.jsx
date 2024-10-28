import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitClaim } from '../contracts/insurance';

const ClaimForm = ({ coverage }) => {
    const [claimData, setClaimData] = useState({
        amount: '',
        description: '',
        diagnosis: '',
        hospitalName: '',
        dateOfService: '',
        treatmentType: '',
        doctorName: '',
        billDocument: null,
        medicalReports: null,
        prescriptions: null
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrls, setPreviewUrls] = useState({});

    const maxClaimAmount = coverage?.totalCoverage * 0.8 || 0;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClaimData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            setClaimData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            
            // Create preview URL
            const url = URL.createObjectURL(files[0]);
            setPreviewUrls(prev => ({
                ...prev,
                [name]: url
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(claimData.amount) > maxClaimAmount) {
            alert(`Maximum claim amount allowed is $${maxClaimAmount}`);
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            Object.keys(claimData).forEach(key => {
                formData.append(key, claimData[key]);
            });

            await submitClaim(formData);
            alert('Claim submitted successfully!');
            // Reset form
            setClaimData({
                amount: '',
                description: '',
                diagnosis: '',
                hospitalName: '',
                dateOfService: '',
                treatmentType: '',
                doctorName: '',
                billDocument: null,
                medicalReports: null,
                prescriptions: null
            });
            setCurrentStep(1);
        } catch (error) {
            console.error('Error submitting claim:', error);
            alert('Failed to submit claim. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <motion.input
                                type="number"
                                name="amount"
                                placeholder="Claim Amount ($)"
                                value={claimData.amount}
                                onChange={handleInputChange}
                                className="p-3 rounded bg-white bg-opacity-20 text-white"
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                            <motion.input
                                type="date"
                                name="dateOfService"
                                value={claimData.dateOfService}
                                onChange={handleInputChange}
                                className="p-3 rounded bg-white bg-opacity-20 text-white"
                                whileFocus={{ scale: 1.02 }}
                                required
                            />
                        </div>
                        <motion.input
                            type="text"
                            name="hospitalName"
                            placeholder="Hospital/Medical Facility Name"
                            value={claimData.hospitalName}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                        <motion.input
                            type="text"
                            name="doctorName"
                            placeholder="Treating Doctor's Name"
                            value={claimData.doctorName}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <motion.input
                            type="text"
                            name="diagnosis"
                            placeholder="Diagnosis/Medical Condition"
                            value={claimData.diagnosis}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                        <motion.select
                            name="treatmentType"
                            value={claimData.treatmentType}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                            whileFocus={{ scale: 1.02 }}
                            required
                        >
                            <option value="">Select Treatment Type</option>
                            <option value="consultation">Consultation</option>
                            <option value="surgery">Surgery</option>
                            <option value="medication">Medication</option>
                            <option value="therapy">Therapy</option>
                            <option value="other">Other</option>
                        </motion.select>
                        <motion.textarea
                            name="description"
                            placeholder="Detailed Description of Medical Services"
                            value={claimData.description}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-white bg-opacity-20 text-white h-32"
                            whileFocus={{ scale: 1.02 }}
                            required
                        />
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">Medical Bills</label>
                                <motion.input
                                    type="file"
                                    name="billDocument"
                                    onChange={handleFileChange}
                                    className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                                {previewUrls.billDocument && (
                                    <img src={previewUrls.billDocument} alt="Bill preview" className="mt-2 h-20 rounded" />
                                )}
                            </div>
                            <div>
                                <label className="block text-white mb-2">Medical Reports</label>
                                <motion.input
                                    type="file"
                                    name="medicalReports"
                                    onChange={handleFileChange}
                                    className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Prescriptions</label>
                                <motion.input
                                    type="file"
                                    name="prescriptions"
                                    onChange={handleFileChange}
                                    className="w-full p-3 rounded bg-white bg-opacity-20 text-white"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            className="mt-12 bg-white bg-opacity-10 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-bold text-white mb-6">File a Claim</h3>
            
            <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg mb-6">
                <p className="text-white">Available Coverage: ${coverage?.totalCoverage || 0}</p>
                <p className="text-gray-300">Maximum Claim Amount: ${maxClaimAmount}</p>
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
                    {renderStep()}
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
                            {isSubmitting ? 'Submitting Claim...' : 'Submit Claim'}
                        </motion.button>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

export default ClaimForm;
