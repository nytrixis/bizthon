import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { insurancePlans } from '../data/insurancePlans';
import PolicyForm from './PolicyForm';
import ClaimForm from './ClaimForm';
import CoverageDetails from './CoverageDetails';
import PlanCard from './PlanCard';

const InsuranceDashboard = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPolicyForm, setShowPolicyForm] = useState(false);
    const [activeCoverage, setActiveCoverage] = useState(null);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setShowPolicyForm(true);
        setTimeout(() => {
            document.getElementById('policy-form').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const handlePolicySubmit = (policyData) => {
        setActiveCoverage({
            ...selectedPlan,
            ...policyData,
            status: 'Active',
            startDate: new Date().toISOString()
        });
        setShowPolicyForm(false);
    };

    return (
        <motion.div 
            className="container mx-auto mt-[93px] p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.h2 
                className="text-4xl font-bold text-white mb-8"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
            >
                Health Insurance Plans
            </motion.h2>

            {!activeCoverage && (
                <div className="grid grid-cols-3 gap-8">
                    {insurancePlans.map((plan) => (
                        <PlanCard 
                            key={plan.id} 
                            plan={plan} 
                            onSelect={() => handlePlanSelect(plan)}
                            isSelected={selectedPlan?.id === plan.id}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {showPolicyForm && selectedPlan && (
                    <motion.div 
                        id="policy-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <PolicyForm 
                            plan={selectedPlan} 
                            onSubmit={handlePolicySubmit}
                            onBack={() => {
                                setShowPolicyForm(false);
                                setSelectedPlan(null);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {activeCoverage && (
                <>
                    <CoverageDetails coverage={activeCoverage} />
                    <ClaimForm coverage={activeCoverage} />
                </>
            )}
        </motion.div>
    );
};

export default InsuranceDashboard;
