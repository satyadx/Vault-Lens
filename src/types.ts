/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Vault {
  id: string;
  name: string;
  apy: number;
  riskScore: number; // 1-100 scale (lower is better/safer)
  riskLabel: 'Low' | 'Moderate' | 'High';
  lockPeriod: string;
  maintenance: 'Low' | 'Medium' | 'High';
  gasEfficiency: 'Excellent' | 'Good' | 'Fair' | 'Unavailable' | 'N/A' | 'Pending';
  stabilityScore: number; // 1-100 scale (higher is more stable)
  description: string;
  chain: string;
  style: 'Passive' | 'Balanced' | 'Aggressive';
  highlighted?: boolean;

  // New Intelligent Recommendation columns
  stressLevel: 'Low' | 'Moderate' | 'High' | 'N/A' | 'Pending' | 'Unavailable';
  stability: string; // e.g. 'Exceptional', 'Stable', 'Highly Volatile', etc.
  maintenanceText: string; // e.g. 'Minimal', 'Weekly Optimization', etc.
  investorType: string; // e.g. 'Passive', 'Institutional', 'Advanced', 'Active'
  strategyType: string;
  suitabilityTags: string[];
}

export interface UserPreferences {
  investmentAmount: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'All';
  preferredChain: string;
  investmentStyle: 'Passive' | 'Balanced' | 'Aggressive' | 'All';
}

export interface RecommendationResponse {
  recommendedVaultId: string;
  vaultName: string;
  matchScore: number;
  title: string;
  customAnalysis: string;
  metrics: {
    operationalStress: string; // e.g., 'Almost zero manual actions'
    gasUsage: string; // e.g., 'Gas optimized batching, saves ~92%'
    stableYield: string; // e.g., 'Backed by Concrete structural protection'
    managementDifficulty: string; // e.g., 'Set and forget'
  };
}
