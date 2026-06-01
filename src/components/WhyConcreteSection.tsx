/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { CONCRETE_BENEFITS } from '../data';

export default function WhyConcreteSection() {
  return (
    <div className="mt-16 bg-[#0F0F0E] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
      {/* Background visual atmosphere elements - glowing amber dust */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#F6CE00] to-transparent shrink-0" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Core explanation column */}
        <div className="lg:col-span-5 space-y-4">
          <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#F6CE00] uppercase bg-[#F6CE00]/10 border border-[#F6CE00]/20 rounded-full">
            Concrete Structural Shield
          </span>
          <h3 className="font-display font-semibold text-3xl text-white tracking-tight leading-snug">
            Why Concrete Vaults?
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
            Concrete vaults are engineered to handle the chaotic climate of modern DeFi. By shifting the meta from stress-filled speculative trading to risk-shielded stability pools, we secure sustainable compound rewards automatically.
          </p>
          <div className="pt-4 flex items-center gap-4 border-t border-zinc-800">
            <div>
              <div className="text-3xl font-display font-bold text-[#F6CE00]">92%</div>
              <div className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">Average Gas Saved</div>
            </div>
            <div className="h-8 w-[1px] bg-zinc-800" />
            <div>
              <div className="text-3xl font-display font-bold text-white">98/100</div>
              <div className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">Ecosystem Stability Index</div>
            </div>
          </div>
        </div>

        {/* Benefits breakdown Column (Bento structure in deep slate blackcard) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONCRETE_BENEFITS.map((benefit, idx) => {
            const IconComponent = (Icons as any)[benefit.icon] || Icons.ShieldCheck;
            
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700/60 transition-all duration-300 space-y-3"
              >
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#F6CE00]">
                  <IconComponent className="h-4.5 w-4.5" />
                </div>
                <h4 className="font-display font-medium text-sm text-zinc-100">
                  {benefit.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
