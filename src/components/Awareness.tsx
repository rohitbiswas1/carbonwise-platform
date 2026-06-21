import React, { useState, memo, useCallback } from 'react';
import { TOP_10_TIPS, DID_YOU_KNOW_FACTS, GLOBAL_STATS } from '../data/constants';
import { useInView } from '../hooks';
import {
  Sun, Apple, Bike, Plane, Utensils, Lightbulb, Shirt, Gauge, Laptop, Landmark,
  ChevronLeft, ChevronRight, BookOpen, ExternalLink, Activity
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-6 h-6 text-amber-500" />,
  Apple: <Apple className="w-6 h-6 text-red-500" />,
  Bike: <Bike className="w-6 h-6 text-emerald-500" />,
  Plane: <Plane className="w-6 h-6 text-blue-500" />,
  Utensils: <Utensils className="w-6 h-6 text-orange-500" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-yellow-500" />,
  Shirt: <Shirt className="w-6 h-6 text-pink-500" />,
  Gauge: <Gauge className="w-6 h-6 text-teal-500" />,
  Laptop: <Laptop className="w-6 h-6 text-indigo-500" />,
  Landmark: <Landmark className="w-6 h-6 text-emerald-600" />,
};

export const Awareness: React.FC = memo(() => {
  const [activeFactIndex, setActiveFactIndex] = useState(0);
  const [selectedTipCategory, setSelectedTipCategory] = useState<'All' | 'Energy' | 'Food' | 'Transport' | 'Lifestyle'>('All');
  const [tipsRef, tipsInView] = useInView();

  const filteredTips = selectedTipCategory === 'All'
    ? TOP_10_TIPS
    : TOP_10_TIPS.filter(t => t.category === selectedTipCategory);

  const nextFact = useCallback(() => setActiveFactIndex((p) => (p + 1) % DID_YOU_KNOW_FACTS.length), []);
  const prevFact = useCallback(() => setActiveFactIndex((p) => (p === 0 ? DID_YOU_KNOW_FACTS.length - 1 : p - 1)), []);

  return (
    <section id="awareness" className="py-24 bg-white dark:bg-gray-900 scroll-mt-20 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Climate Awareness & Insights</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Knowledge is the First Step to Change</p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Scientifically grounded facts and high-impact lifestyle adjustments.</p>
        </div>

        {/* Statistics Grid */}
        <div className="mb-20">
          <div className="flex items-center space-x-2 mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
            <Activity className="w-6 h-6 text-emerald-500" aria-hidden="true" />
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Real Global CO₂ Statistics</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GLOBAL_STATS.map((stat) => (
              <div key={stat.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between card-lift">
                <div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight text-emerald-600 dark:text-emerald-400">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-2 mb-3">{stat.label}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{stat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center justify-between">
                  <span>UN/IEA Data</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Did You Know */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-extrabold text-emerald-100 mb-6 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Did You Know? &bull; Fact {activeFactIndex + 1} of {DID_YOU_KNOW_FACTS.length}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">{DID_YOU_KNOW_FACTS[activeFactIndex].title}</h4>
              <p className="text-lg sm:text-xl text-emerald-50/90 leading-relaxed font-light mb-8">
                &ldquo;{DID_YOU_KNOW_FACTS[activeFactIndex].statement}&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-emerald-500/40">
                <div className="text-xs text-emerald-200/80 font-medium">
                  Source: <span className="font-bold text-white">{DID_YOU_KNOW_FACTS[activeFactIndex].source}</span> ({DID_YOU_KNOW_FACTS[activeFactIndex].year})
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={prevFact} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all backdrop-blur-md" aria-label="Previous fact">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextFact} className="p-3 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 transition-all shadow-lg" aria-label="Next fact">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 10 Tips */}
        <div ref={tipsRef}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 dark:border-gray-700 pb-6 transition-all duration-700 ${tipsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Top 10 Tips to Reduce Carbon Footprint</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">High-impact actions ranked by reduction efficacy</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Energy', 'Food', 'Transport', 'Lifestyle'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTipCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTipCategory === cat
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-pressed={selectedTipCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <div key={tip.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between card-lift">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm shrink-0">
                        {iconMap[tip.icon] || <Sun className="w-6 h-6 text-emerald-500" />}
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                          Tip #{tip.id} &bull; {tip.category}
                        </span>
                        <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mt-0.5">{tip.title}</h4>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider shrink-0 ${
                      tip.impact === 'High' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700' :
                      tip.impact === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700' :
                      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
                    }`}>
                      {tip.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">{tip.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-200/80 dark:border-gray-700 flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                  <span>Annual Savings:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">~{tip.co2SavedKg} kg CO₂/yr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Awareness.displayName = 'Awareness';
