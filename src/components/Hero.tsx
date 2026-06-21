import React, { memo } from 'react';
import { Globe, Leaf, ChevronRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

/** Floating leaf particle */
const LeafParticle: React.FC<{ delay: number; left: number; size: number; duration: number }> = memo(({ delay, left, size, duration }) => (
  <div
    className="absolute pointer-events-none opacity-30 dark:opacity-20"
    style={{
      left: `${left}%`,
      top: '-5%',
      fontSize: `${size}px`,
      animation: `leaf-fall ${duration}s ease-in ${delay}s infinite`,
    }}
    aria-hidden="true"
  >
    🍃
  </div>
));
LeafParticle.displayName = 'LeafParticle';

export const Hero: React.FC = memo(() => {
  const leaves = [
    { delay: 0, left: 15, size: 20, duration: 12 },
    { delay: 3, left: 35, size: 16, duration: 14 },
    { delay: 6, left: 55, size: 14, duration: 10 },
    { delay: 2, left: 75, size: 18, duration: 13 },
    { delay: 5, left: 90, size: 12, duration: 11 },
    { delay: 8, left: 25, size: 22, duration: 15 },
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50">
      {/* Animated leaf particles */}
      {leaves.map((l, i) => <LeafParticle key={i} {...l} />)}

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-tr from-emerald-200/20 via-emerald-100/10 to-transparent dark:from-emerald-800/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-emerald-200/80 dark:border-emerald-700/60 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                Empowering Eco-Conscious Decisions
              </span>
              <span className="bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                Pure Frontend
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] sm:leading-[1.15]">
              Measure Your Impact. <br />
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Secure Our Shared Future.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              CarbonWise is your complete interactive dashboard for calculating personal CO₂ emissions, discovering high-impact lifestyle changes, and making powerful green action pledges.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 text-base group focus-visible:outline-2 focus-visible:outline-emerald-500"
                aria-label="Launch carbon calculator"
              >
                <span>Launch Calculator</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#awareness"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:border-emerald-200 dark:hover:border-emerald-600 transition-all text-base"
              >
                <span>View Climate Tips</span>
              </a>
            </div>

            {/* Feature badges */}
            <div className="pt-6 border-t border-gray-200/80 dark:border-gray-700/60 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-bold text-base sm:text-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Interactive</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Real-time emission updates</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-bold text-base sm:text-lg">
                  <AlertCircle className="w-4 h-4 text-emerald-500" />
                  <span>4.8 Tonnes</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Global average comparison</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-bold text-base sm:text-lg">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  <span>Pledge</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Downloadable certificate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Animated globe */}
          <div className="lg:col-span-5 relative flex items-center justify-center px-4 sm:px-0">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-300/10 animate-pulse-slow blur-xl" />
              <div className="absolute inset-4 rounded-full border border-dashed border-emerald-300 dark:border-emerald-600 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full border border-emerald-200/60 dark:border-emerald-700/40 animate-[spin_40s_linear_infinite_reverse]" />

              <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-1 shadow-2xl shadow-emerald-600/40 flex items-center justify-center animate-float">
                <div className="w-full h-full rounded-full bg-emerald-900/10 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-md" />
                  <Globe className="w-24 h-24 sm:w-32 sm:h-32 text-white/90 drop-shadow-md mb-2" aria-hidden="true" />
                  <div className="absolute bottom-6 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 flex items-center space-x-2 shadow-lg">
                    <Leaf className="w-4 h-4 text-emerald-200 animate-bounce" />
                    <span className="text-xs font-bold tracking-wider uppercase text-white">Live Earth Tracker</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 sm:top-2 -left-4 sm:left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[170px] animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Global Target</div>
                <div className="text-xl font-black text-gray-900 dark:text-white mt-0.5">2.0 Tonnes</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1"><span>Per person by 2030</span></div>
              </div>

              <div className="absolute -bottom-6 sm:bottom-0 -right-4 sm:right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[180px] animate-float" style={{ animationDelay: '3s' }}>
                <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Community Pledges</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">12,842 +</div>
                <div className="text-[11px] text-gray-600 dark:text-gray-400 font-medium mt-1">Active tree planting & eco actions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center no-print">
          <a
            href="#calculator"
            className="flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500 hover:text-emerald-500 transition-colors group"
            aria-label="Scroll to calculator"
          >
            <span className="text-xs font-semibold tracking-widest uppercase">Scroll to Calculate</span>
            <div className="w-8 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-emerald-500 flex items-center justify-center p-1 transition-colors">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
