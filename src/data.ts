/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vault } from './types';

export const DEFAULT_VAULTS: Vault[] = [
  {
    id: 'concrete-stable',
    name: 'Concrete DeFi USDT',
    apy: 8.4,
    riskScore: 12,
    riskLabel: 'Low',
    lockPeriod: 'None (Liquid)',
    maintenance: 'Low',
    gasEfficiency: 'Excellent',
    stabilityScore: 98,
    chain: 'Concrete Core Network',
    style: 'Passive',
    description: 'Dynamic risk-covered stable asset farming. Operates using Concrete structural protective layers, mitigating slashing and depeg shocks.',
    highlighted: true,
    stressLevel: 'Low',
    stability: 'Exceptional',
    maintenanceText: 'Minimal',
    investorType: 'Passive',
    strategyType: 'Structured Yield',
    suitabilityTags: ['Best Balanced', 'Low Operational Stress', 'Passive Friendly', 'Structured Yield']
  },
  {
    id: 'weeth-vault',
    name: 'WeETH Vault',
    apy: 6.2,
    riskScore: 32,
    riskLabel: 'Moderate',
    lockPeriod: 'Pending',
    maintenance: 'Medium',
    gasEfficiency: 'Good',
    stabilityScore: 82,
    chain: 'Ethereum Mainnet',
    style: 'Balanced',
    description: 'Institutional grade ether yield capturing strategy with dynamic staking protection metrics.',
    highlighted: false,
    stressLevel: 'Moderate',
    stability: 'Stable',
    maintenanceText: 'Weekly Optimization',
    investorType: 'Institutional',
    strategyType: 'ETH Yield',
    suitabilityTags: ['Institutional Grade', 'ETH Exposure', 'Moderate Management']
  },
  {
    id: 'wbtc-vault',
    name: 'WBTC Vault',
    apy: 5.1,
    riskScore: 25,
    riskLabel: 'Low',
    lockPeriod: 'N/A',
    maintenance: 'Low',
    gasEfficiency: 'Good',
    stabilityScore: 90,
    chain: 'Bitcoin Wrapping Layer',
    style: 'Passive',
    description: 'Long-term BTC compounding with single-sided security and structural protection layers.',
    highlighted: false,
    stressLevel: 'Low',
    stability: 'Exceptional',
    maintenanceText: 'Minimal',
    investorType: 'Passive',
    strategyType: 'Stable Bitcoin Strategy',
    suitabilityTags: ['Long-Term BTC Exposure', 'Stable Bitcoin Strategy']
  },
  {
    id: 'frxusd',
    name: 'frxUSD+',
    apy: 9.5,
    riskScore: 28,
    riskLabel: 'Moderate',
    lockPeriod: 'None',
    maintenance: 'Low',
    gasEfficiency: 'Good',
    stabilityScore: 88,
    chain: 'Frax Chain',
    style: 'Passive',
    description: 'Stable yield layer aggregator maximizing fractional reserve liquidity rewards with Concrete buffer assistance.',
    highlighted: false,
    stressLevel: 'Low',
    stability: 'Stable',
    maintenanceText: 'Minimal',
    investorType: 'Passive',
    strategyType: 'Stable Yield Layer',
    suitabilityTags: ['Stable Yield Layer', 'Moderate Passive Income']
  },
  {
    id: 'katana-ausd',
    name: 'Katana AUSD',
    apy: 21.4,
    riskScore: 72,
    riskLabel: 'High',
    lockPeriod: '30 Days',
    maintenance: 'High',
    gasEfficiency: 'Fair',
    stabilityScore: 40,
    chain: 'Katana Protocol',
    style: 'Aggressive',
    description: 'High risk algorithmic US dollar yield mining strategy. Exposed to structural smart contract and collateral leverage pool swings.',
    highlighted: false,
    stressLevel: 'High',
    stability: 'Volatile',
    maintenanceText: 'Active Monitoring',
    investorType: 'Advanced',
    strategyType: 'Aggressive Growth',
    suitabilityTags: ['High Risk / High Yield', 'Advanced Users Only']
  },
  {
    id: 'berachain-bera',
    name: 'Berachain BERA',
    apy: 34.2,
    riskScore: 90,
    riskLabel: 'High',
    lockPeriod: 'N/A',
    maintenance: 'High',
    gasEfficiency: 'Pending',
    stabilityScore: 15,
    chain: 'Berachain Core Testnet',
    style: 'Aggressive',
    description: 'Liquidity proof indexing dynamic vault targeting high volatility token pool distributions.',
    highlighted: false,
    stressLevel: 'High',
    stability: 'Highly Volatile',
    maintenanceText: 'Active Monitoring',
    investorType: 'Active',
    strategyType: 'Extreme Growth',
    suitabilityTags: ['Extreme Volatility', 'Active Monitoring Required']
  }
];

export interface MetricExplainer {
  title: string;
  shortDesc: string;
  detail: string;
  iconName: string;
}

export const METRIC_EXPLAINERS: MetricExplainer[] = [
  {
    title: 'APY (Annual Percentage Yield)',
    shortDesc: 'Reflects the compounded yearly yield percentage.',
    detail: 'Unlike traditional volatile yield engines, Concrete stable models prioritize predictable organic yields, bypassing reward tokens prone to hyperinflation.',
    iconName: 'Percent'
  },
  {
    title: 'Risk Score (1-100)',
    shortDesc: 'Quantifies comprehensive smart contract and collateral risk.',
    detail: 'A composite score evaluating code audits, historical pool volatility, depeg threats, and counterparty exposure. Lower scores denote highly secure structures.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Lock Period',
    shortDesc: 'Durations required for capital withdrawal commits.',
    detail: 'Specifies whether funds are immediately liquid or bound in time-locks. Concrete vaults support immediate on-demand withdraws with zero exit penalties.',
    iconName: 'Calendar'
  },
  {
    title: 'Maintenance Level',
    shortDesc: 'Friction and manual labor required by the investor.',
    detail: 'Measures structural rebalancing tasks. Passive structures automate compound scheduling, freeing you from manual portfolio monitoring.',
    iconName: 'Wrench'
  },
  {
    title: 'Gas Efficiency',
    shortDesc: 'Relative savings regarding gas fees and transactions.',
    detail: 'Indicates how well the vault processes underlying state updates. Concrete pools aggregate interactions into batch transactions, decreasing user costs by up to 92%.',
    iconName: 'Gauge'
  },
  {
    title: 'Stability Score',
    shortDesc: 'Resistance against sudden market downturns and shifts.',
    detail: 'An indicators of how well the vault maintains continuous consistent returns across high market turbulence, measured by drawdown resistance indices.',
    iconName: 'Activity'
  }
];

export const CONCRETE_BENEFITS = [
  {
    title: 'Sustainable Long-Term Yields',
    description: 'Structured to extract yields from robust, non-inflationary organic fees. Bypasses highly volatile speculative emission rewards.',
    icon: 'Layers'
  },
  {
    title: 'Autonomous Simplicity & High Efficiency',
    description: 'Automates complex multi-step rebalancing processes. Gas is pooled, saving up to 92% compared to personal wallet transactions.',
    icon: 'Sparkles'
  },
  {
    title: 'Risk Mitigation Infrastructure',
    description: 'Built-in protective liquidity buffers and depeg coverage. Preserves investor peace of mind through deep algorithmic risk hedging.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Calm & Consistent Portfolio Growth',
    description: 'Rejects the stressful, low-retention gambling meta. Built for institutional calmness, rewarding deliberate, structured investing.',
    icon: 'Compass'
  }
];
