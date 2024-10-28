import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCoverageDetails } from '../contracts/insurance';

const CoverageDetails = ({ coverage: propCoverage }) => {
    const [coverage, setCoverage] = useState(propCoverage || null);
    const [loading, setLoading] = useState(!propCoverage);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!propCoverage) {
            const fetchCoverage = async () => {
                try {
                    const details = await getCoverageDetails();
                    setCoverage(details);
                } catch (error) {
                    console.error('Error fetching coverage:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCoverage();
        }
    }, [propCoverage]);

    const renderOverviewTab = () => (
        <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
                <motion.div 
                    className="bg-white bg-opacity-20 p-4 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h4 className="text-lg font-semibold text-white mb-2">Plan Details</h4>
                    <p className="text-gray-300">Plan Name: {coverage.planName}</p>
                    <p className="text-gray-300">Policy Number: {coverage.policyNumber}</p>
                    <p className="text-gray-300">
                        Status: 
                        <span className={`ml-2 px-2 py-1 rounded ${
                            coverage.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                            {coverage.status}
                        </span>
                    </p>
                </motion.div>

                <motion.div 
                    className="bg-white bg-opacity-20 p-4 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h4 className="text-lg font-semibold text-white mb-2">Coverage Amount</h4>
                    <p className="text-3xl font-bold text-white">${coverage.totalCoverage}</p>
                    <p className="text-gray-300">Monthly Premium: ${coverage.monthlyPremium}</p>
                    <div className="mt-2 bg-blue-500 bg-opacity-20 p-2 rounded">
                        <p className="text-sm text-blue-200">
                            Next Premium Due: {new Date(coverage.nextPremiumDate).toLocaleDateString()}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="space-y-4">
                <motion.div 
                    className="bg-white bg-opacity-20 p-4 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h4 className="text-lg font-semibold text-white mb-2">Policy Period</h4>
                    <p className="text-gray-300">Start Date: {coverage.startDate}</p>
                    <p className="text-gray-300">End Date: {coverage.endDate}</p>
                    <div className="mt-2">
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-blue-500 rounded-full h-2" 
                                style={{ width: `${coverage.policyProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                            {coverage.policyProgress}% of policy period completed
                        </p>
                    </div>
                </motion.div>

                <motion.div 
                    className="bg-white bg-opacity-20 p-4 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h4 className="text-lg font-semibold text-white mb-2">Claims Summary</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">{coverage.totalClaims}</p>
                            <p className="text-sm text-gray-300">Total Claims</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-500">{coverage.pendingClaims}</p>
                            <p className="text-sm text-gray-300">Pending</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-500">{coverage.approvedClaims}</p>
                            <p className="text-sm text-gray-300">Approved</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );

    return (
        <motion.div
            className="mt-12 bg-white bg-opacity-10 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Your Coverage Details</h3>
                <div className="flex space-x-4">
                    <motion.button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.print()}
                    >
                        Download PDF
                    </motion.button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : coverage ? (
                <AnimatePresence mode='wait'>
                    {renderOverviewTab()}
                </AnimatePresence>
            ) : (
                <div className="text-center py-12">
                    <p className="text-white text-lg mb-4">No active coverage found</p>
                    <motion.button
                        className="bg-blue-500 text-white px-6 py-2 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '#plans'}
                    >
                        View Available Plans
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default CoverageDetails;
