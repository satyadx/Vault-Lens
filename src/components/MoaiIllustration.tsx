/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface MoaiProps {
  isAnalyzing: boolean;
  activePreference: string;
}

export default function MoaiIllustration({ isAnalyzing, activePreference }: MoaiProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-amber-50/20 rounded-3xl border border-neutral-100/80 shadow-premium transition-all duration-500 overflow-hidden group select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft futuristic ambient light glow */}
      <div className="absolute inset-0 bg-radial-gradient from-accent-yellow/5 to-transparent pointer-events-none" />
      
      {/* Pulsing visual core indicators */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${isAnalyzing ? 'bg-amber-400 animate-ping' : 'bg-green-400'}`} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-concrete-gray">
          {isAnalyzing ? 'Analyzing Equilibrium' : 'Ecosystem Stable'}
        </span>
      </div>

      {/* Floating Ambient Web3 Particle Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-accent-yellow rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-neutral-300 rounded-full blur-[0.5px] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-amber-200 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* The main Humanoid Moai Face SVG */}
      <div className="relative w-full max-w-[240px] aspect-[4/5] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        
        {/* Futuristic glowing backplate orb */}
        <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-br from-amber-100/40 via-yellow-200/5 to-transparent blur-xl pointer-events-none animate-glow-slow" />

        <svg
          viewBox="0 0 400 500"
          className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions for elaborate smooth geometric lighting effects */}
          <defs>
            <linearGradient id="foreheadGrad" x1="200" y1="50" x2="200" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F9F9F5" />
            </linearGradient>
            <linearGradient id="noseGrad" x1="200" y1="130" x2="250" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5F5EC" />
              <stop offset="50%" stopColor="#EAEAE1" />
              <stop offset="100%" stopColor="#DFDED4" />
            </linearGradient>
            <linearGradient id="shadowSide" x1="200" y1="150" x2="130" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFDDD3" />
              <stop offset="100%" stopColor="#C4C2B4" />
            </linearGradient>
            <linearGradient id="jawGrad" x1="200" y1="350" x2="200" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ECEBE4" />
              <stop offset="100%" stopColor="#DAD8CE" />
            </linearGradient>
            <linearGradient id="epicAccent" x1="200" y1="100" x2="350" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF2" />
              <stop offset="70%" stopColor="#FFF2B2" />
              <stop offset="100%" stopColor="#F6CE00" />
            </linearGradient>
            
            {/* Soft shadow filter */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.04" />
            </filter>
            
            <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND STRUCTURE */}
          {/* Abstract architectural clean alignment rails (Concrete style) */}
          <line x1="80" y1="30" x2="80" y2="470" stroke="#F6CE00" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.3" />
          <line x1="320" y1="30" x2="320" y2="470" stroke="#F6CE00" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.3" />
          <circle cx="200" cy="250" r="145" stroke="#E6E6DC" strokeWidth="1" opacity="0.4" />
          <circle cx="200" cy="250" r="145" stroke="#F6CE00" strokeWidth="1.5" strokeDasharray="40 300" opacity="0.8" className="origin-center animate-spin" style={{ animationDuration: '30s' }} />

          {/* MONUMENT BODY: NECK & BASE */}
          {/* Left Neck Plane / Darker edge */}
          <path d="M150 400 L140 460 L200 470 Z" fill="url(#shadowSide)" opacity="0.8" />
          {/* Right Neck Plane / Main base */}
          <path d="M200 470 L260 460 L250 400 L200 400 Z" fill="url(#jawGrad)" />
          {/* Collar geometric slice */}
          <path d="M120 460 H280 L290 480 H110 Z" fill="#E6E6DC" opacity="0.4" />

          {/* MAIN SERENE HEAD STRUCTURE */}
          
          {/* 1. Forehead plane / Flat top crown */}
          <path d="M150 90 H250 L270 140 H130 Z" fill="url(#foreheadGrad)" filter="url(#softShadow)" />

          {/* 2. Left temples / shadow cheek side */}
          <path d="M130 140 L140 310 L200 350 L200 140 Z" fill="url(#shadowSide)" />

          {/* 3. Right major illuminated face plane */}
          <path d="M200 140 L200 350 L260 310 L270 140 Z" fill="url(#epicAccent)" opacity="0.85" />

          {/* 4. Sleek futuristic heavy brow line */}
          <path d="M130 140 H270 L265 160 H135 Z" fill="#121211" opacity="0.85" />
          
          {/* 5. Sleek long noble Nose Plane (Futuristic angular 3D block) */}
          {/* Left shadow side of nose */}
          <path d="M185 155 L180 325 L200 335 L200 155 Z" fill="#A8AA9A" opacity="0.8" />
          {/* Front illuminated side of nose */}
          <path d="M200 155 L200 335 L220 325 L215 155 Z" fill="#FFFFF0" />
          {/* Nose tip solid facet */}
          <path d="M180 325 L200 348 L220 325 H180 Z" fill="#EAEAE0" />

          {/* 6. Dignified, Heavy Lips Plane (Serene, deep meditation) */}
          <path d="M175 352 H225 L220 360 H180 Z" fill="#BDBB9E" />
          <path d="M180 360 H220 L213 368 H187 Z" fill="#8C8A71" />

          {/* 7. Strong Angular Jaw Silhouette */}
          <path d="M140 310 L150 400 H250 L260 310 L200 350 Z" fill="url(#jawGrad)" />
          {/* Jaw Under-slice */}
          <path d="M150 400 L200 420 L250 400 H150 Z" fill="#BDBB9E" opacity="0.6" />

          {/* FUTURISTIC EMBELLISHMENTS & GLOW INDICATORS */}
          {/* Glowing neon visor line under the serene brow */}
          <path d="M135 158 H265" stroke="#F6CE00" strokeWidth="2.5" opacity={hovered || isAnalyzing ? '1' : '0.65'} filter="url(#yellowGlow)" className="transition-opacity duration-300" />

          {/* Cybernetic energy circuit lines along face contour */}
          <path d="M255 180 L250 250 L235 270" stroke="#F6CE00" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <path d="M145 180 L150 250 L165 270" stroke="#B1B2A1" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
          
          {/* Small laser etched metrics box on cheek */}
          <rect x="235" y="278" width="18" height="6" rx="1.5" fill="#121211" opacity="0.8" />
          <circle cx="249" cy="281" r="1.5" fill="#F6CE00" className={isAnalyzing ? 'animate-pulse' : ''} />

          {/* Ground shadows & lighting support facets */}
          <ellipse cx="200" cy="485" rx="90" ry="10" fill="#EAEAEC" opacity="0.7" />
        </svg>
      </div>

      {/* Structured Typography under the sculpture */}
      <div className="mt-5 text-center px-2">
        <h4 className="font-display font-semibold text-lg text-premium-black tracking-tight leading-snug group-hover:text-amber-500 transition-colors duration-300">
          The Guard of Calm
        </h4>
        <p className="mt-1.5 text-xs text-concrete-gray font-mono leading-relaxed uppercase tracking-wider">
          {isAnalyzing ? (
            <span className="text-amber-500 animate-pulse">Calculating Balance...</span>
          ) : activePreference ? (
            <span>Filtering: {activePreference}</span>
          ) : (
            <span>Concrete Ecosystem Guard</span>
          )}
        </p>
        <p className="mt-3 text-xs text-concrete-gray/80 max-w-[280px] leading-relaxed italic">
          "DeFi is often a storm of noise. True yield lives in deliberate risk coverage and structured architectural calm."
        </p>
      </div>
    </div>
  );
}
