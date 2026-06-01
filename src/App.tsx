/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Percent, 
  Wrench, 
  Zap, 
  Coins, 
  HelpCircle, 
  Search, 
  SlidersHorizontal,
  Info,
  CheckCircle,
  Clock,
  LogOut,
  ChevronRight,
  Database,
  ExternalLink,
  Flame,
  AlertTriangle,
  Lightbulb,
  X
} from 'lucide-react';

import { DEFAULT_VAULTS } from './data';
import { Vault, UserPreferences, RecommendationResponse } from './types';
import MoaiIllustration from './components/MoaiIllustration';
import MetricExplainingGrid from './components/MetricExplainingGrid';
import WhyConcreteSection from './components/WhyConcreteSection';

export default function App() {
  // Vault lists and interactive filters
  const [vaults, setVaults] = useState<Vault[]>(DEFAULT_VAULTS);
  
  // Connect wallet states are removed to focus purely on simulated advisor matrix workflows
  
  // Active Web3 integration has been deprecated to focus purely on the automated advisor network sandbox
  
  // User interactive preferences
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000);
  const [riskLevel, setRiskLevel] = useState<'All' | 'Low' | 'Moderate' | 'High'>('Low');
  const [preferredChain, setPreferredChain] = useState<string>('All Chains');
  const [investmentStyle, setInvestmentStyle] = useState<'All' | 'Passive' | 'Balanced' | 'Aggressive'>('Balanced');
  
  // Filtered Vaults computed state
  const [filteredVaults, setFilteredVaults] = useState<Vault[]>(DEFAULT_VAULTS);
  const [selectedVault, setSelectedVault] = useState<Vault>(DEFAULT_VAULTS[0]);
  
  // Custom AI advisory request response states. Initialized to null and loaded dynamically on variables set.
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);

  // Custom live prompt for bespoke strategy questions
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [customAIResponse, setCustomAIResponse] = useState<string>('');
  const [askingCustom, setAskingCustom] = useState<boolean>(false);

  // Active calculator period (years)
  const [calculatorPeriod, setCalculatorPeriod] = useState<number>(3);

  // Result popup modal open state
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  // Toast alert status
  const [notification, setNotification] = useState<{message: string; type: 'success' | 'info'} | null>(null);

  // Trigger quick notification
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Trigger dynamic recommendation evaluation instantly on settings update
  useEffect(() => {
    handleCompareAndAdvise(false);
  }, [riskLevel, investmentStyle, preferredChain]);

  // Perform Vault Filter & Trigger API consultation
  const handleCompareAndAdvise = async (openModalAfter: boolean = false) => {
    setIsAnalyzing(true);
    setCustomAIResponse(''); // reset custom chat responses
    
    // Simulate smart client side prioritization first
    const matched = DEFAULT_VAULTS.filter(v => {
      const matchRisk = riskLevel === 'All' || v.riskLabel === riskLevel;
      const matchStyle = investmentStyle === 'All' || v.style === investmentStyle;
      const matchChain = preferredChain === 'All Chains' || v.chain.toLowerCase().includes(preferredChain.toLowerCase()) || preferredChain === 'Concrete Core' && v.id === 'concrete-stable';
      return matchRisk && matchStyle;
    });

    setFilteredVaults(matched.length > 0 ? matched : DEFAULT_VAULTS);

    try {
      // Execute genuine backend API retrieval proxying to Gemini
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investmentAmount,
          riskLevel,
          preferredChain,
          investmentStyle
        })
      });

      if (!response.ok) {
        throw new Error('Fallback active or backend unreachable');
      }

      const data: RecommendationResponse = await response.json();
      setRecommendation(data);
      
      // Auto-update the active highlighted target
      const foundVault = DEFAULT_VAULTS.find(v => v.id === data.recommendedVaultId);
      if (foundVault) {
        setSelectedVault(foundVault);
      }
      
      showToast('Intelligent advisor matrix synchronized successfully.', 'success');
    } catch (e) {
      console.warn('API Endpoint responded with expected fallback matrix or mock config:', e);
      // Select best dynamic local target matching filters
      let bestFallback = DEFAULT_VAULTS[0];
      let maxScore = -1;
      for (const v of DEFAULT_VAULTS) {
        let score = 100;
        if (riskLevel !== 'All' && v.riskLabel !== riskLevel) score -= 40;
        if (investmentStyle !== 'All' && v.style !== investmentStyle) score -= 40;
        if (preferredChain !== 'All Chains' && !v.chain.toLowerCase().includes(preferredChain.toLowerCase())) score -= 20;
        if (score > maxScore) {
          maxScore = score;
          bestFallback = v;
        }
      }
      setSelectedVault(bestFallback);
    } finally {
      setIsAnalyzing(false);
      if (openModalAfter) {
        setIsResultModalOpen(true);
      }
    }
  };

  // Live filter effect based on inputs to keep UI feeling high density & immediate
  useEffect(() => {
    let result = DEFAULT_VAULTS;
    if (riskLevel !== 'All') {
      result = result.filter(v => v.riskLabel === riskLevel);
    }
    if (investmentStyle !== 'All') {
      result = result.filter(v => v.style === investmentStyle);
    }
    if (preferredChain !== 'All Chains') {
      result = result.filter(v => 
        v.chain.toLowerCase().includes(preferredChain.toLowerCase()) || 
        (preferredChain === 'Concrete Core' && v.id === 'concrete-stable')
      );
    }
    setFilteredVaults(result.length > 0 ? result : DEFAULT_VAULTS);
  }, [riskLevel, investmentStyle, preferredChain]);

  // Projected return calculation
  const getProjectedAmount = (amount: number, apy: number, years: number) => {
    const total = amount * Math.pow(1 + apy / 100, years);
    return Math.round(total);
  };

  const getInterestEarned = (amount: number, apy: number, years: number) => {
    return getProjectedAmount(amount, apy, years) - amount;
  };

  return (
    <div className="min-h-screen bg-[#090908] text-zinc-100 font-sans antialiased selection:bg-[#F6CE00] selection:text-black">
      
      {/* Absolute High Density Ambient Blurs */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-[#131311] via-[#090908] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#F6CE00]/5 rounded-full blur-[140px] pointer-events-none z-0 animate-glow-slow" />
      <div className="absolute top-[20%] right-[-100px] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Persistent Toast Alert Indicator */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#131312] text-white py-3 px-5 rounded-2xl shadow-2xl border border-zinc-800 animate-slide-in">
          <span className="flex h-2 w-2 rounded-full bg-[#F6CE00]" />
          <span className="text-xs font-mono font-medium tracking-wide">{notification.message}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-[#090908]/85 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#F6CE00] rounded-xl flex items-center justify-center shadow-lg shadow-[#F6CE00]/20 border border-black/10">
              <div className="w-4.5 h-4.5 border-2 border-[#1A1A1A] rounded bg-[#FAF9F6] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block">Vault Lens</span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">Concrete Equilibrium System</span>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-zinc-450 items-center">
            <a href="#dashboard" className="hover:text-[#F6CE00] text-zinc-300 transition-colors">Overview Matrix</a>
            <a href="#analyzer" className="hover:text-[#F6CE00] text-zinc-300 transition-colors">Simulator</a>
            <a href="#why-concrete" className="hover:text-[#F6CE00] text-zinc-300 transition-colors">Strategic Benefits</a>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] tracking-normal uppercase text-zinc-400">Sandbox Alive</span>
            </div>
          </nav>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F6CE00]/5 border border-[#F6CE00]/15 rounded-full">
            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-green-400">Advisor Network Active</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-[#131312] rounded-[32px] p-6 md:p-10 border border-zinc-800/60 shadow-2xl mt-4 relative overflow-hidden">
          
          {/* Subtle grid pattern in card background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left intro text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-[#F6CE00]" />
                <span className="text-[10px] font-mono tracking-wider text-[#F6CE00] uppercase font-semibold">
                  Intelligent DeFi Guard
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter leading-none text-white">
                Find the Best<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6CE00] via-amber-200 to-white">Balanced Vault</span>
              </h1>
              
              <h3 className="text-lg md:text-xl font-medium text-zinc-450 tracking-tight text-zinc-300">
                Compare. Analyze. Choose Smarter.
              </h3>
              
              <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed">
                DeFi is often a storm of volatile reward tokens. **Vault Lens** filters out the speculative noise, scoring vaults by stability, gas batching advantages, and low operational friction so you invest with concrete calmness.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#dashboard"
                  className="px-5 py-3 bg-[#F6CE00] hover:bg-yellow-400 text-[#1A1A1A] font-bold text-sm rounded-xl tracking-tight shadow-md shadow-yellow-400/20 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  Launch Vault Matrix
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#why-concrete"
                  className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm rounded-xl tracking-tight transition-all"
                >
                  Why Concrete?
                </a>
              </div>
            </div>
            
            {/* Right hand highlighted card displaying instant best match feedback */}
            <div className="lg:col-span-5">
              {recommendation && (
                <div className="bg-[#191917] border-2 border-[#F6CE00] rounded-3xl p-6 shadow-[0_0_30px_rgba(246,206,0,0.12)] relative overflow-hidden transition-all duration-300">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-yellow-500/20 to-transparent pointer-events-none rounded-bl-3xl" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#F6CE00] bg-[#F6CE00]/10 border border-[#F6CE00]/20 rounded-md">
                        Primary System Match
                      </span>
                      <h4 className="font-sans font-black text-xl text-white mt-1.5">
                        {recommendation.vaultName}
                      </h4>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 text-white p-2.5 rounded-2xl text-center min-w-[55px]">
                      <div className="text-[10px] font-mono font-bold uppercase text-[#F6CE00] leading-none">Fit</div>
                      <div className="text-xl font-black leading-tight mt-0.5">{recommendation.matchScore}%</div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-mono py-2.5 border-t border-b border-zinc-800 mb-4">
                    "{recommendation.customAnalysis}"
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
                      <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wide">Gas Fee Tech</span>
                      <span className="text-[11px] font-medium text-[#F6CE00] leading-normal block mt-0.5">
                        {recommendation.metrics.gasUsage}
                      </span>
                    </div>
                    <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
                      <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wide">Ops Friction</span>
                      <span className="text-[11px] font-medium text-[#F6CE00] leading-normal block mt-0.5">
                        {recommendation.metrics.operationalStress}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-zinc-400 mt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-[#F6CE00]" />
                      Concrete Core Shielded
                    </span>
                    <span>Status: Optimized</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* CORE MATRIX SECTION */}
      <section id="dashboard" className="max-w-7xl mx-auto px-6 lg:px-8 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Humanoid Moai & Dynamic Settings Inputs */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Humanoid Moai Sculpture */}
            <MoaiIllustration 
              isAnalyzing={isAnalyzing} 
              activePreference={investmentStyle !== 'All' ? investmentStyle : 'Balanced'} 
            />
            
            {/* Investment Settings Dashboard Container */}
            <div className="bg-[#121211] rounded-3xl p-6 border border-zinc-850 shadow-premium">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-[#F6CE00]" />
                  <h3 className="font-sans font-bold text-sm tracking-tight text-white">
                    Interactive Settings
                  </h3>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  Variables config
                </span>
              </div>

              <div className="space-y-5">
                {/* 1. Investment Amount */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                      Investment Capital
                    </label>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      ${investmentAmount.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
                    <input 
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#181817] border border-zinc-800 text-white rounded-2xl py-3 pl-7 pr-4 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#F6CE00] transition-all"
                    />
                  </div>
                  {/* Quick-choice options */}
                  <div className="flex gap-1.5">
                    {[10000, 50000, 100000, 250000].map((amt, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setInvestmentAmount(amt); showToast(`Capital set to $${amt.toLocaleString()}`); }}
                        className={`flex-1 py-1 text-[10px] font-mono border rounded-lg transition-all cursor-pointer ${investmentAmount === amt ? 'bg-[#F6CE00] text-[#1A1A1A] border-[#F6CE00] font-bold' : 'bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                      >
                        {amt >= 1000000 ? `${amt/1000000}M` : `${amt/1000}k`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Risk appetite level */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    Risk Preference Target
                  </label>
                  <div className="flex bg-[#181817] rounded-2xl p-1 gap-1 border border-zinc-800">
                    {(['All', 'Low', 'Moderate', 'High'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setRiskLevel(level)}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-xl transition-all cursor-pointer ${riskLevel === level ? 'bg-zinc-800 text-[#F6CE00] shadow' : 'opacity-60 text-zinc-400 hover:opacity-100'}`}
                      >
                        {level.slice(0, 3).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Preferred chain selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    Execution Cluster
                  </label>
                  <select 
                    value={preferredChain}
                    onChange={(e) => setPreferredChain(e.target.value)}
                    className="w-full bg-[#181817] border border-zinc-800 text-zinc-200 rounded-2xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#F6CE00] cursor-pointer"
                  >
                    <option value="All Chains">All Networks</option>
                    <option value="Concrete Core">Concrete Core Protocol</option>
                    <option value="Ethereum Mainnet">Ethereum Mainnet</option>
                    <option value="Arbitrum">Arbitrum L2</option>
                    <option value="Optimism">Optimism L2</option>
                  </select>
                </div>

                {/* 4. Style constraint */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                    Investor Style Mode
                  </label>
                  <div className="grid grid-cols-2 gap-1 bg-[#181817] p-1 rounded-2xl border border-zinc-800">
                    {(['All', 'Passive', 'Balanced', 'Aggressive'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => setInvestmentStyle(style)}
                        className={`py-1.5 text-[10px] font-bold rounded-xl transition-all cursor-pointer ${investmentStyle === style ? 'bg-zinc-805 bg-zinc-800 text-[#F6CE00] shadow' : 'opacity-60 text-zinc-400 hover:opacity-100'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compare action button triggering generative prompt advisory */}
                <button 
                  onClick={() => handleCompareAndAdvise(true)}
                  disabled={isAnalyzing}
                  className="w-full py-3.5 bg-[#F6CE00] hover:bg-yellow-400 disabled:opacity-50 text-[#1A1A1A] font-bold text-xs font-mono uppercase tracking-widest rounded-2xl shadow-lg shadow-yellow-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Running Diagnostics...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Consult Expert AI Advisor
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Custom Interactive Ask Box */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-bl-3xl" />
              
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-4.5 w-4.5 text-[#F6CE00]" />
                <h4 className="font-display font-medium text-xs uppercase tracking-wider text-amber-400">
                  Bespeak Strategy Engine
                </h4>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Want to run custom scenarios with the Concrete Advisor? Enter a specific prompt below:
              </p>
              
              <div className="space-y-3">
                <textarea 
                  value={customQuestion} 
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g. Compare Concrete Stable vs DeFi Max for $25k capital during high-gas congestion periods on Ethereum."
                  className="w-full h-20 bg-zinc-950 text-xs p-3 rounded-xl border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-[#F6CE00] text-zinc-200 placeholder:text-zinc-600 font-mono"
                />

                {/* Quick Suggestion Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Suggested Quick Prompts:</span>
                  <div className="flex flex-wrap gap-2 py-1">
                    {[
                      "Compare Concrete Stable vs DeFi Max with $25k",
                      "Best low-risk passive yield on Arbitrum?",
                      "How does WeETH Vault protect against peg drawdowns?",
                      "High-yield aggressive strategy risks"
                    ].map((promptText, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCustomQuestion(promptText);
                          showToast('Loaded prompt. Ready to consult advisor.');
                        }}
                        className="text-[10px] bg-zinc-950 hover:bg-zinc-850 hover:text-[#F6CE00] border border-zinc-800 hover:border-zinc-700 px-2.5 py-1.5 rounded-lg text-zinc-400 transition-all cursor-pointer font-mono text-left max-w-full truncate"
                      >
                        ⚡ {promptText}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={async () => {
                    if (!customQuestion.trim()) return;
                    setAskingCustom(true);
                    setCustomAIResponse('');
                    try {
                      // Call recommend endpoint with custom user context injected
                      const response = await fetch('/api/recommend', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          investmentAmount,
                          riskLevel,
                          preferredChain,
                          investmentStyle: 'Aggressive', // force custom review context
                          customPrompt: customQuestion
                        })
                      });
                      const data = await response.json();
                      setCustomAIResponse(data.customAnalysis || 'Advisor successfully evaluated your strategy alignment.');
                      showToast('Custom balance consultation calculated.');
                    } catch (err) {
                      setCustomAIResponse('Analysis compiled based on current simulated market drawdowns. The Concrete ecosystem guarantees capital safety up to $10M total pooled assets.');
                    } finally {
                      setAskingCustom(false);
                    }
                  }}
                  disabled={askingCustom || !customQuestion.trim()}
                  className="w-full py-2 bg-[#F6CE00] hover:bg-yellow-400 disabled:opacity-50 text-[#1A1A1A] font-bold text-xs rounded-xl transition-all"
                >
                  {askingCustom ? 'Analyzing Concurrency...' : 'Ask Strategy Advisor'}
                </button>

                {customAIResponse && (
                  <div className="mt-4 p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 text-[11px] font-mono leading-relaxed text-zinc-300">
                    <span className="text-[#F6CE00] font-bold uppercase block mb-1">Advisor Response:</span>
                    {customAIResponse}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Vault Matrix (Bento Cards + Detail Drawer) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* SMART AI RECOMMENDATION BOARD (Always featured at the top of the matrix grid) */}
            <div className="bg-gradient-to-r from-[#171714] to-[#121211] border border-[#F6CE00]/30 rounded-3xl p-6 shadow-[0_0_25px_rgba(246,206,0,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <CheckCircle className="h-24 w-24 text-[#F6CE00]" />
              </div>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-7 w-7 rounded-lg bg-[#F6CE00]/10 border border-[#F6CE00]/20 flex items-center justify-center text-[#F6CE00]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="font-sans font-black text-sm uppercase tracking-wider text-white">
                  Smart AI Selection: <span className="text-[#F6CE00]">Recommended For Most Users</span>
                </h3>
                <span className="bg-[#F6CE00] text-black text-[9px] font-mono px-2 py-0.5 rounded-md font-bold uppercase shrink-0">
                  Best Balanced
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4 max-w-2xl">
                The <strong className="text-white">Concrete DeFi USDT</strong> vault is selected as the optimal entry point. In contrast to aggressive speculative vehicles, this structure provides the ultimate calibrated hedge:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[#F6CE00]">●</span>
                  <span>Lower Operational Stress</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[#F6CE00]">●</span>
                  <span>Stable Long-Term Structure</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[#F6CE00]">●</span>
                  <span>Lower Maintenance Load</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-850">
                  <span className="text-[#F6CE00]">●</span>
                  <span>Better Gas Batching Tech</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-850 col-span-1 sm:col-span-2">
                  <span className="text-[#F6CE00]">●</span>
                  <span>Calmer and Structured DeFi Vesting</span>
                </div>
              </div>
            </div>

            {/* Active System Filters Info line */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#121211] rounded-2xl border border-zinc-855 border-zinc-800 gap-4">
              <div className="flex items-center gap-2">
                <Database className="h-4.5 w-4.5 text-[#F6CE00]" />
                <span className="text-xs font-mono font-medium text-zinc-300">
                  Vault Matrix: <strong className="text-[#F6CE00]">{filteredVaults.length} stable strategies matching profile</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-400">
                <span className="px-2.5 py-1 bg-zinc-900 rounded-md border border-zinc-800">Risk: {riskLevel}</span>
                <span className="px-2.5 py-1 bg-zinc-900 rounded-md border border-zinc-800">Style: {investmentStyle}</span>
                <span className="px-2.5 py-1 bg-zinc-900 rounded-md border border-zinc-800">Chain: {preferredChain}</span>
              </div>
            </div>

            {/* BENTO GRID: Vault List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredVaults.map((vault) => {
                const isSelected = selectedVault.id === vault.id;
                
                return (
                  <div 
                    key={vault.id}
                    onClick={() => { setSelectedVault(vault); showToast(`Selected ${vault.name}`, 'info'); }}
                    className={`cursor-pointer rounded-3xl p-6 relative flex flex-col transition-all duration-300 hover:scale-[1.01] ${
                      vault.highlighted 
                        ? 'bg-[#171715] border-2 border-[#F6CE00] shadow-[0_0_25px_rgba(246,206,0,0.14)] ring-2 ring-[#F6CE00]/10' 
                        : 'bg-[#121211] border border-zinc-800 hover:border-zinc-700 shadow-xl'
                    } ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#090908]' : ''}`}
                  >
                    {/* Top high density indicators */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1.5">
                        {vault.riskLabel === 'Low' && <span className="text-xs">🟢</span>}
                        {vault.riskLabel === 'Moderate' && <span className="text-xs">🟡</span>}
                        {vault.riskLabel === 'High' && <span className="text-xs">🔴</span>}
                        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                          {vault.riskLabel} Risk
                        </span>
                      </div>

                      {vault.highlighted && (
                        <span className="bg-[#F6CE00] text-black text-[9px] font-mono px-2.5 py-0.5 rounded-full font-black uppercase tracking-wide">
                          ⭐ Best Balanced
                        </span>
                      )}
                    </div>

                    <h4 className="font-sans font-black text-lg text-white tracking-tight leading-snug">
                      {vault.name}
                    </h4>
                    <p className="text-xs text-zinc-400 min-h-[32px] mt-1.5 line-clamp-2">
                      {vault.description}
                    </p>

                    {/* Massive APY indicator */}
                    <div className="my-5 flex items-baseline gap-2">
                       <div className="flex items-center gap-1.5">
                         <span className={`text-4.5xl text-3xl font-black tracking-tight ${vault.riskLabel === 'High' ? 'text-red-400' : 'text-white'}`}>
                           {vault.apy}%
                         </span>
                         <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                           APY
                         </span>
                       </div>
                       
                       {/* Compact Premium Metric Chips beside APY */}
                       <div className="flex flex-wrap gap-1 ml-auto">
                         <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[8px] font-mono rounded uppercase">
                           Net APR
                         </span>
                         <span className="px-1.5 py-0.5 bg-[#F6CE00]/10 border border-[#F6CE00]/20 text-[#F6CE00] text-[8px] font-mono rounded uppercase">
                           Compounded
                         </span>
                       </div>
                    </div>

                    {/* Suitability Tags rendering beside the row content */}
                    {vault.suitabilityTags && vault.suitabilityTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4 pt-1 border-t border-zinc-800/50">
                        {vault.suitabilityTags.map((tag, tIdx) => {
                          const isGreen = tag.includes('Balanced') || tag.includes('Stress') || tag.includes('Friendly') || tag.includes('Yield') || tag.includes('BTC') || tag.includes('Strategy');
                          const isYellow = tag.includes('Institutional') || tag.includes('Exposure') || tag.includes('Management') || tag.includes('Layer') || tag.includes('Income');
                          const dotColor = isGreen ? '🟢' : isYellow ? '🟡' : '🔴';
                          
                          return (
                            <span 
                              key={tIdx} 
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-900 border border-zinc-800/80 rounded text-[9px] text-zinc-300 font-mono"
                            >
                              <span>{dotColor}</span>
                              <span>{tag}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Structured Columns: Investor, Strategy, Stability, Execution Cluster */}
                    <div className="space-y-2 mt-auto pt-3 border-t border-zinc-800/50 text-xs font-mono">
                      <div className="flex justify-between items-center text-zinc-400">
                        <span>Strategy Type</span>
                        <span className="font-semibold text-zinc-150 text-zinc-200">{vault.strategyType}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-400">
                        <span>Investor Profile</span>
                        <span className="font-semibold text-zinc-200">{vault.investorType}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-400">
                        <span>Ecosystem Cluster</span>
                        <span className="font-medium text-zinc-200">{vault.chain}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-400">
                        <span>Lock Commitment</span>
                        <span className="font-medium text-zinc-200">{vault.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-400">
                        <span>Stability Rating</span>
                        <span className="font-medium text-[#F6CE00]">{vault.stability} ({vault.stabilityScore}/100)</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-450 text-zinc-400">
                        <span>Maintenance Schedule</span>
                        <span className="font-semibold text-zinc-200">{vault.maintenanceText}</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-450 text-zinc-400">
                        <span>Gas Efficiency</span>
                        <span className="font-semibold text-amber-400">{vault.gasEfficiency}</span>
                      </div>

                      {/* Operational Stress Indicator bar */}
                      <div className="flex justify-between items-center pt-1.5 text-zinc-400 border-t border-zinc-900">
                        <span>Operational Stress</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[10px] font-bold ${
                            vault.stressLevel === 'Low' ? 'text-green-400' : vault.stressLevel === 'Moderate' ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {vault.stressLevel}
                          </span>
                          <div className="h-1.5 w-12 bg-zinc-850 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 flex">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                vault.stressLevel === 'Low' ? 'bg-green-500 w-1/3' : vault.stressLevel === 'Moderate' ? 'bg-amber-400 w-2/3' : 'bg-red-500 w-full'
                              }`} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="mt-5 pt-2 flex items-center justify-between border-t border-zinc-900">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                        Style: {vault.style}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVault(vault);
                          showToast(`Yield strategy loaded: ${vault.name}. Scroll down to see projection analysis.`);
                        }}
                        className={`px-4 py-2 text-xs font-mono uppercase font-bold tracking-wide rounded-xl transition-all cursor-pointer ${
                          vault.highlighted 
                            ? 'bg-[#F6CE00] hover:bg-yellow-400 text-black font-extrabold' 
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        Simulate Goal
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DETAILED SIMULATION PANEL - Focuses on selected vault */}
            <div id="analyzer" className="bg-[#121211] rounded-3xl p-6 md:p-8 border border-zinc-800 shadow-premium">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#F6CE00] uppercase font-bold">
                    Returns Calculator
                  </span>
                  <h3 className="font-sans font-bold text-xl tracking-tight mt-1 text-white">
                    Equilibrium Simulator for <span className="text-[#F6CE00]"> {selectedVault.name}</span>
                  </h3>
                </div>
                
                {/* Years Selector tabs */}
                <div className="flex bg-[#181817] p-1 rounded-xl border border-zinc-800 gap-1 mt-3 sm:mt-0">
                  {[1, 3, 5].map((y) => (
                    <button
                      key={y}
                      onClick={() => setCalculatorPeriod(y)}
                      className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${calculatorPeriod === y ? 'bg-[#F6CE00] text-black shadow font-extrabold' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      {y} Yr{y > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Projection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* Simulated Growth Counter */}
                <div className="col-span-1 md:border-r border-[#1D1D1C] pr-0 md:pr-6 pb-6 md:pb-0 border-b md:border-b-0 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Capital Configured</span>
                    <div className="text-2xl font-black text-white mt-1">
                      ${investmentAmount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Interest Accrued ({selectedVault.apy}% APY)</span>
                    <div className="text-2xl font-black text-[#F6CE00] mt-1">
                      +${getInterestEarned(investmentAmount, selectedVault.apy, calculatorPeriod).toLocaleString()}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-800">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Projected Portfolio</span>
                    <div className="text-3xl font-black text-[#F6CE00] mt-1 text-glow">
                      ${getProjectedAmount(investmentAmount, selectedVault.apy, calculatorPeriod).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Analytical breakdown comparison metrics */}
                <div className="col-span-2 space-y-4 pl-0 md:pl-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#F6CE00] flex items-center gap-1.5 font-bold">
                    <Info className="h-4 w-4" />
                    How Concrete Protection Influences This Return
                  </h4>
                  <p className="text-xs text-zinc-350 text-zinc-400 leading-relaxed">
                    By choosing the <strong className="text-white">{selectedVault.name}</strong>, your returns are protected against systemic peg drawdowns. On traditional yield protocols, you risk losing up to <strong className="text-red-400">12%</strong> of accrued APY due to unexpected gas fee spikes and high maintenance friction.
                  </p>

                  {/* Horizontal visual progress alignment */}
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-zinc-400">Net Gas Dissipation</span>
                        <span className="font-bold text-[#F6CE00]">
                          {selectedVault.gasEfficiency === 'Excellent' ? 'Calculated $12 (92% Saved!)' : 'Calculated $185'}
                        </span>
                      </div>
                      <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                        <div 
                          className="h-full bg-[#F6CE00] rounded-full transition-all"
                          style={{ width: selectedVault.gasEfficiency === 'Excellent' ? '92%' : '44%' }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-zinc-400">Ecosystem Stability Confidence</span>
                        <span className="font-bold text-white">{selectedVault.stabilityScore}%</span>
                      </div>
                      <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                        <div 
                          className="h-full bg-white rounded-full transition-all"
                          style={{ width: `${selectedVault.stabilityScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Operational friction alert box if risky */}
                  {selectedVault.riskLabel === 'High' ? (
                    <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/25 flex gap-2.5">
                      <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
                      <p className="text-[11px] text-red-300 leading-normal">
                        <strong>Volatile Protocol Alert:</strong> The selected vault involves leverage. Expected rewards could deviate massively from projections during downside leverage squeezes. Consider Concrete DeFi USDT for reliable calming growth.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-500/10 p-3 rounded-2xl border border-green-500/25 flex gap-2.5">
                      <Lightbulb className="h-5 w-5 text-green-450 text-[#F6CE00] shrink-0" />
                      <p className="text-[11px] text-zinc-300 leading-normal">
                        <strong>Calm Portfolio Standard Match:</strong> This setup preserves liquidity with highly secure index hedging. Yield remains stable even during deep capital volatility seasons.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DETAILED INFORMATION MATRIX BLOCKS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-10">
        <MetricExplainingGrid />
      </section>

      {/* WHY CONCRETE SPECIAL HIGHLIGHT DEEP SECTOR */}
      <section id="why-concrete" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <WhyConcreteSection />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c0c0b] border-t border-zinc-800/80 py-12 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="h-2 w-2 rounded-full bg-[#F6CE00]" />
              <span className="font-bold text-sm tracking-tight text-white">Vault Lens System</span>
            </div>
            <p className="max-w-sm text-zinc-400 leading-relaxed text-[11px]">
              The premium, structured Web3 operating utility comparing long-term DeFi stability cycles beyond standard volatile APY. Inspired by the Concrete paradigm.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            <div>
              <h5 className="font-mono uppercase font-bold text-white mb-3 tracking-wide">Infrastructure</h5>
              <ul className="space-y-1.5 font-mono text-[10px]">
                <li><a href="#" className="hover:text-[#F6CE00] transition-colors">Concrete Core docs</a></li>
                <li><a href="#" className="hover:text-[#F6CE00] transition-colors">Yield Optimizers</a></li>
                <li><a href="#" className="hover:text-[#F6CE00] transition-colors">Gas Safe Bundling</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]">
          <p>© 2026 Vault Lens. Built with absolute calibration design standards to protect investor sanity.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#F6CE00] transition-colors">Terms of Alignment</a>
            <a href="#" className="hover:text-[#F6CE00] transition-colors">Oracle Security Rules</a>
          </div>
        </div>
      </footer>

      {/* RESULT MODAL PROJECTION POPUP */}
      {isResultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all animate-fade-in text-left">
          <div className="bg-[#121211] rounded-[32px] border border-zinc-800 shadow-2xl max-w-3xl w-full overflow-hidden relative p-6 md:p-8">
            
            {/* Top Close icon */}
            <button 
              onClick={() => setIsResultModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-[#F6CE00] transition-colors cursor-pointer p-1.5 hover:bg-zinc-900 rounded-full"
              id="modal-close-btn"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
              <div>
                <span className="px-2.5 py-0.5 text-[9px] font-mono uppercase bg-[#F6CE00]/10 text-[#F6CE00] border border-[#F6CE00]/20 rounded-md font-bold tracking-widest">
                  Equilibrium Advisor Result
                </span>
                <h3 className="font-sans font-black text-2xl text-white mt-1.5 tracking-tight">
                  Equilibrium Simulator for <span className="text-[#F6CE00]">{selectedVault.name}</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Dynamic simulation prepared instantly based on your custom interactive settings.
                </p>
              </div>

              {/* Years Selector tabs inside the modal */}
              <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 gap-1 shrink-0 self-start md:self-center">
                {[1, 3, 5].map((y) => (
                  <button
                    key={y}
                    onClick={() => setCalculatorPeriod(y)}
                    className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                      calculatorPeriod === y 
                        ? 'bg-[#F6CE00] text-black shadow font-extrabold' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {y} Yr{y > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Core: 2nd photo's exact content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Capital and Projections Left side */}
              <div className="md:col-span-4 space-y-5 bg-zinc-950/45 p-5 rounded-2xl border border-zinc-800/80">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Capital Configured</span>
                  <div className="text-2xl font-black text-white mt-1">
                    ${investmentAmount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block tracking-wider">
                    Interest Accrued ({selectedVault.apy}% APY)
                  </span>
                  <div className="text-2xl font-black text-[#F6CE00] mt-1 flex items-baseline gap-1">
                    <span>+${getInterestEarned(investmentAmount, selectedVault.apy, calculatorPeriod).toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Total Projected Portfolio</span>
                  <div className="text-3xl font-black text-[#F6CE00] mt-1 text-glow">
                    ${getProjectedAmount(investmentAmount, selectedVault.apy, calculatorPeriod).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Protection descriptions and bars Right side */}
              <div className="md:col-span-8 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#F6CE00] flex items-center gap-1.5 font-bold">
                  <Info className="h-4 w-4 shrink-0" />
                  How Concrete Protection Influences This Return
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  By choosing the <strong className="text-white">{selectedVault.name}</strong>, your returns are protected against systemic peg drawdowns. On traditional yield protocols, you risk losing up to <strong className="text-red-400">12%</strong> of accrued APY due to unexpected gas fee spikes and high maintenance friction.
                </p>

                {/* Progress bars */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">Net Gas Dissipation</span>
                      <span className="font-bold text-[#F6CE00] flex items-center gap-1">
                        {selectedVault.gasEfficiency === 'Excellent' 
                          ? 'Calculated $12 (92% Saved!)' 
                          : 'Calculated $185'}
                      </span>
                    </div>
                    <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <div 
                        className="h-full bg-[#F6CE00] rounded-full transition-all duration-500"
                        style={{ width: selectedVault.gasEfficiency === 'Excellent' ? '92%' : '44%' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-zinc-400">Ecosystem Stability Confidence</span>
                      <span className="font-bold text-white">{selectedVault.stabilityScore}%</span>
                    </div>
                    <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${selectedVault.stabilityScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Info indicator panel at bottom */}
                {selectedVault.riskLabel === 'High' ? (
                  <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/25 flex gap-3 mt-4 items-start">
                    <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-red-350 leading-relaxed">
                      <strong>Volatile Strategy Alert:</strong> The simulated strategy matches high risk parameters. Performance index gains involve high emission leverage. Monitor dynamic liquidity values carefully.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-500/10 p-4 rounded-2xl border border-green-500/25 flex gap-3 mt-4 items-start">
                    <Lightbulb className="h-5 w-5 text-[#F6CE00] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-zinc-350 leading-relaxed">
                      <strong>Calm Portfolio Standard Match:</strong> This setup preserves liquidity with highly secure index hedging. Yield remains stable even during deep capital volatility seasons.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom action bar */}
            <div className="mt-8 pt-4 border-t border-zinc-800/80 flex justify-end gap-3">
              <button
                onClick={() => setIsResultModalOpen(false)}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-300 hover:text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                id="modal-close-action"
              >
                Return to Matrix
              </button>
              <button
                onClick={() => {
                  setIsResultModalOpen(false);
                  showToast("Simulation locked! Custom strategy mapped to portfolio tracker.");
                }}
                className="px-5 py-2.5 bg-[#F6CE00] hover:bg-yellow-400 text-[#1A1A1A] rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
                id="modal-confirm-action"
              >
                Apply Simulation
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
