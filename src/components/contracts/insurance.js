import { Contract } from '@alephium/web3';
import { insurancePoolABI } from './abi';

const CONTRACT_ADDRESS = process.env.REACT_APP_INSURANCE_CONTRACT_ADDRESS;

export const insuranceContract = new Contract(
    'InsurancePool',
    CONTRACT_ADDRESS,
    insurancePoolABI
);

export const createPolicy = async (policyData) => {
    try {
        const result = await insuranceContract.methods.createPolicy(
            policyData.coverage,
            policyData.duration
        ).execute();
        return result;
    } catch (error) {
        throw new Error(`Failed to create policy: ${error.message}`);
    }
};

export const submitClaim = async (claimData) => {
    try {
        const result = await insuranceContract.methods.submitClaim(
            claimData.amount,
            claimData.evidence
        ).execute();
        return result;
    } catch (error) {
        throw new Error(`Failed to submit claim: ${error.message}`);
    }
};

export const getCoverageDetails = async () => {
    try {
        const result = await insuranceContract.methods.getPolicyInfo().execute();
        return {
            planName: result.planName,
            policyNumber: result.policyId,
            status: result.isActive ? 'Active' : 'Inactive',
            totalCoverage: result.coverage,
            monthlyPremium: result.premium,
            startDate: new Date(result.startTime * 1000).toLocaleDateString(),
            endDate: new Date(result.endTime * 1000).toLocaleDateString(),
            totalClaims: result.totalClaims,
            pendingClaims: result.pendingClaims,
            approvedClaims: result.approvedClaims
        };
    } catch (error) {
        throw new Error(`Failed to fetch coverage details: ${error.message}`);
    }
};
