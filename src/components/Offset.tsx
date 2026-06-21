import React, { useState, useMemo, memo, useCallback } from 'react';
import { OFFSET_PROGRAMS } from '../data/constants';
import { Trees, ExternalLink, ShieldCheck, DollarSign, ArrowRight, TreePine, RefreshCw } from 'lucide-react';
import { useInView } from '../hooks';

interface OffsetProps {
  userTotalEmissions: number;
}

export const Offset: React.FC<OffsetProps> = memo(({ userTotalEmissions }) => {
  const TREE_CO2_ABSORPTION_KG = 22;
  const initialTreesNeeded = Math.max(1, Math.ceil(userTotalEmissions / TREE_CO2_ABSORPTION_KG));

  const [treeCount, setTreeCount] = useState<number>(initialTreesNeeded);
  const [offsetRef, offsetInView] = useInView();

  // Reset when userTotalEmissions changes
  const handleReset = useCallback(() => setTreeCount(initialTreesNeeded), [initialTreesNeeded]);

  const offsetAmountKg = useMemo(() => treeCount * TREE_CO2_ABSORPTION_KG, [treeCount]);
  const offsetPercentage = useMemo(
    () => userTotalEmissions > 0 ? Math.min(200, Math.round((offsetAmountKg / userTotalEmissions) * 100)) : 100,
    [offsetAmountKg, userTotalEmissions]
  );
  const estimatedTreeCost = useMemo(() => (treeCount * 1.50).toFixed(2), [treeCount]);

  return (
    <section id="offset" className="py-24 bg-white dark:bg-gray-900 scroll-mt-20 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Carbon Offset Solutions</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Neutralize Your Unavoidable Footprint</p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Explore tree planting balances and certified offset funds.</p>
        </div>

        {/* Tree Calculator */}
        <div ref={offsetRef} className={`bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-teal-50/60 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border border-emerald-200/80 dark:border-emerald-700/50 rounded-3xl p-6 sm:p-12 shadow-xl mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-700 ${offsetInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <Trees className="w-4 h-4" aria-hidden="true" />
              <span>Interactive Tree Calculator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              You Need <span className="text-emerald-600 dark:text-emerald-400 font-black">{initialTreesNeeded} Trees</span> to Neutralize Your Footprint
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              Based on your footprint of <span className="font-bold text-gray-900 dark:text-white">{userTotalEmissions.toLocaleString()} kg CO₂/year</span>, planting {initialTreesNeeded} mature trees would absorb your full annual output.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-700 shadow-sm space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Target Trees</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{treeCount} Trees</span>
              </div>
              <input
                type="range"
                min="1" max="1000" step="5"
                value={treeCount}
                onChange={(e) => setTreeCount(Number(e.target.value))}
                className="w-full h-2.5 bg-emerald-200 dark:bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                aria-label="Number of trees to plant"
                aria-valuemin={1} aria-valuemax={1000} aria-valuenow={treeCount}
              />
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                <span>Absorbs: <strong className="text-gray-900 dark:text-white">{offsetAmountKg.toLocaleString()} kg CO₂</strong></span>
                <span>Offset: <strong className={`font-bold ${offsetPercentage >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>{offsetPercentage}%</strong></span>
                <span>Cost: <strong className="text-emerald-700 dark:text-emerald-400">${estimatedTreeCost}</strong></span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
              <TreePine className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Assumes ~22 kg CO₂ absorption per mature tree per year.</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200/80 dark:border-gray-700 shadow-sm text-center">
            <div className="w-32 h-32 rounded-full bg-emerald-50 dark:bg-emerald-900/50 border-4 border-emerald-500 dark:border-emerald-400 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-inner">
              <Trees className="w-16 h-16 animate-pulse" aria-hidden="true" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {offsetPercentage >= 100 ? '🎉 Net-Zero Eco Champion!' : '🌱 On the Path to Net-Zero'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mb-8 leading-relaxed font-medium">
              {offsetPercentage >= 100
                ? `You are offsetting ${offsetPercentage}% of your emissions!`
                : `You are matching ${offsetPercentage}% of your emissions.`}
            </p>
            <div className="w-full bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-600 flex items-center justify-between text-left mb-6">
              <div>
                <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Recommended Non-Profit</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">Eden Reforestation Projects</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">~$0.15-$1.50 per tree</div>
              </div>
              <a href="https://edenprojects.org" target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow transition-all flex items-center justify-center shrink-0" aria-label="Visit Eden Projects">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <button onClick={handleReset} className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-700 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Match Footprint ({initialTreesNeeded} Trees)</span>
            </button>
          </div>
        </div>

        {/* Verified Programs */}
        <div>
          <div className="flex items-center space-x-2 mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" aria-hidden="true" />
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Verified Offset Programs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OFFSET_PROGRAMS.map((prog) => (
              <div key={prog.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col card-lift">
                <div className="h-48 overflow-hidden relative">
                  <img src={prog.image} alt={prog.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">{prog.category}</span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block mb-0.5">{prog.organization}</span>
                    <h4 className="text-lg font-bold tracking-tight">{prog.name}</h4>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">{prog.description}</p>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Est. Tonne Cost</span>
                      <div className="text-lg font-black text-gray-900 dark:text-white flex items-center">
                        <DollarSign className="w-4 h-4 text-emerald-600 -mr-0.5" aria-hidden="true" />
                        <span>{prog.costPerTon} / Tonne</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">{prog.certification}</div>
                    </div>
                    <a href={prog.url} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-500/20 transition-all group text-xs" aria-label={`Support ${prog.name}`}>
                      <span>Support Fund</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Offset.displayName = 'Offset';
