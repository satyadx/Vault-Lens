/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { METRIC_EXPLAINERS, MetricExplainer } from '../data';

export default function MetricExplainingGrid() {
  return (
    <div className="mt-16 bg-gradient-to-b from-[#131312] to-[#0A0A09] border border-zinc-800/60 p-8 rounded-3xl shadow-xl">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="px-3 py-1 text-[11px] font-mono tracking-widest text-[#F6CE00] uppercase bg-[#F6CE00]/10 border border-[#F6CE00]/20 rounded-full">
          Analytical Guard
        </span>
        <h3 className="mt-3 font-sans font-black text-2xl text-zinc-100 tracking-tight">
          Metric Diagnostics
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Unlike chaotic platforms that only promote raw APY, Vault Lens scores multiple dimensions to protect your structural peace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {METRIC_EXPLAINERS.map((metric: MetricExplainer, idx: number) => {
          // Dynamic Lucide icon resolution
          const IconComponent = (Icons as any)[metric.iconName] || Icons.CircleCheck;

          return (
            <div 
              key={idx} 
              className="group hover:bg-[#1A1A19] p-6 rounded-2xl border border-transparent hover:border-zinc-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-900 group-hover:bg-[#F6CE00]/10 text-zinc-300 group-hover:text-[#F6CE00] transition-colors duration-300">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h4 className="font-sans font-bold text-sm text-zinc-200 group-hover:text-[#F6CE00] transition-colors duration-300">
                  {metric.title}
                </h4>
              </div>
              <p className="mt-3 text-xs font-mono text-[#F6CE00]/90 uppercase tracking-wide">
                {metric.shortDesc}
              </p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
