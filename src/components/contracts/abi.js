export const insurancePoolABI = [
    {
      name: "createPolicy",
      inputs: [
        { name: "coverage", type: "uint256" },
        { name: "duration", type: "uint256" }
      ]
    },
    {
      name: "submitClaim",
      inputs: [
        { name: "amount", type: "uint256" },
        { name: "evidence", type: "string" }
      ]
    },
    {
      name: "getPolicyInfo",
      inputs: [],
      outputs: [
        { name: "planName", type: "string" },
        { name: "policyId", type: "uint256" },
        { name: "isActive", type: "bool" },
        { name: "coverage", type: "uint256" },
        { name: "premium", type: "uint256" },
        { name: "startTime", type: "uint256" },
        { name: "endTime", type: "uint256" },
        { name: "totalClaims", type: "uint256" },
        { name: "pendingClaims", type: "uint256" },
        { name: "approvedClaims", type: "uint256" }
      ]
    }
  ]
  