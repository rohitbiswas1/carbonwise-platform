import React, { memo, Suspense, lazy } from 'react';
import { CategoryEmissions, UnitSystem } from '../types';
import { GLOBAL_AVERAGE_KG, COUNTRY_COMPARISONS } from '../data/constants';
import { useAnimatedCounter, useInView } from '../hooks';
import { getGrade } from '../utils/unitConversion';
import { CheckCircle, Info, TrendingDown, TrendingUp } from 'lucide-react';

// Lazy-load Chart.js components for bundle optimization
const PieChart = lazy(() => import('./charts/PieChart'));
const BarChart = lazy(() => import('./charts/BarChart'));

const ChartFallback: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-shimmer w-full h-full rounded-xl" />
  </div>
);

interface DashboardProps {
  emissions: CategoryEmissions;
  unitSystem: UnitSystem;
  onUnitToggle: () => void;
}

export const Dashboard: React.FC<DashboardProps> = memo(({ emissions, unitSystem, onUnitToggle }) => {
  const displayTotal = useAnimatedCounter(emissions.total, 800);
  const grade = getGrade(emissions.total);
  const [dashRef, dashInView] = useInView();

  // Level logic
  let level = 'Medium';
  let levelColor = 'text-amber-700 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 dark:text-amber-300';
  let barColor = 'bg-amber-500';
  let percentage = Math.min(100, Math.round((emissions.total / 12000) * 100));
  let levelDesc = 'Your footprint is moderate. There are great opportunities to trim emissions.';

  if (emissions.total < 3500) {
    level = 'Low';
    levelColor = 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 dark:text-emerald-300';
    barColor = 'bg-emerald-500';
    levelDesc = 'Excellent! Your footprint is significantly below the global average.';
  } else if (emissions.total >= 6000 && emissions.total < 10000) {
    level = 'High';
    levelColor = 'text-orange-700 bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 dark:text-orange-300';
    barColor = 'bg-orange-500';
    levelDesc = 'Your footprint is high compared to the global baseline. Priority changes recommended.';
  } else if (emissions.total >= 10000) {
    level = 'Critical';
    levelColor = 'text-red-700 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 dark:text-red-300';
    barColor = 'bg-red-500';
    levelDesc = 'Critical alert! Your emissions exceed sustainable planetary boundaries.';
  }

  return (
    <section id="dashboard" className="py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Interactive Emissions Dashboard</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Visual Assessment & Global Comparison</p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">See where your emissions come from and how you stack up.</p>
        </div>

        {/* Summary Card */}
        <div ref={dashRef} className={`bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-10 shadow-xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${dashInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Total & Grade */}
          <div className="lg:col-span-5 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-700 pb-8 lg:pb-0 lg:pr-8">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-1">Annual Estimate</span>
            <div className="flex items-baseline justify-center lg:justify-start space-x-2 my-2">
              <span className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight" aria-live="polite">
                {displayTotal.toLocaleString()}
              </span>
              <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{unitSystem}</span>
            </div>
            <div className="mt-4 inline-flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Grade:</span>
              <span className="text-2xl font-black" style={{ color: grade.color }}>{grade.letter}</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 flex-wrap">
              <button
                onClick={onUnitToggle}
                className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold px-3 py-1.5 rounded-xl transition-colors"
                aria-label={`Switch unit from ${unitSystem}`}
              >
                Switch to {unitSystem === 'kg' ? 'tonnes' : unitSystem === 'tonnes' ? 'lbs' : 'kg'}
              </button>
              <div className="inline-flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-xs text-gray-600 dark:text-gray-300 font-medium">
                {emissions.total <= GLOBAL_AVERAGE_KG ? (
                  <><TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" /><span>{((1 - emissions.total / GLOBAL_AVERAGE_KG) * 100).toFixed(0)}% below global avg</span></>
                ) : (
                  <><TrendingUp className="w-4 h-4 text-amber-600 shrink-0" /><span>{((emissions.total / GLOBAL_AVERAGE_KG - 1) * 100).toFixed(0)}% above global avg</span></>
                )}
              </div>
            </div>
          </div>

          {/* Progress Meter */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">Carbon Severity Level</span>
                <div className="text-2xl font-black text-gray-900 dark:text-white mt-0.5 flex items-center space-x-3">
                  <span>Rating:</span>
                  <span className={`px-4 py-1 rounded-full border text-sm font-extrabold shadow-sm ${levelColor}`}>{level}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-xs">Scale: Low (&lt;3.5t) | Med (3.5-6t) | High (6-10t) | Critical (&gt;10t)</div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${percentage}%` }} role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <span>0 kg</span>
                <span>4,800 kg (Avg)</span>
                <span>12,000+ kg</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200/80 dark:border-gray-600 rounded-2xl p-4 flex items-start space-x-3 text-gray-700 dark:text-gray-300 text-sm">
              <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">{levelDesc}</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center">
            <div className="w-full border-b border-gray-100 dark:border-gray-700 pb-4 mb-6 text-center sm:text-left">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Emissions by Category</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Identifies your biggest impact sector</p>
            </div>
            <div className="w-full max-w-[320px] aspect-square flex items-center justify-center my-auto">
              <Suspense fallback={<ChartFallback />}>
                <PieChart emissions={emissions} />
              </Suspense>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Transport</div>
                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{emissions.transport} kg</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Energy</div>
                <div className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">{emissions.homeEnergy} kg</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Food</div>
                <div className="text-sm font-extrabold text-emerald-500 dark:text-emerald-400">{emissions.food} kg</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl">
                <div className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Shopping</div>
                <div className="text-sm font-extrabold text-emerald-400 dark:text-emerald-400">{emissions.shopping} kg</div>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col">
            <div className="w-full border-b border-gray-100 dark:border-gray-700 pb-4 mb-6 text-center sm:text-left">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Country Comparison</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your footprint vs. country averages</p>
            </div>
            <div className="w-full my-auto py-6" style={{ maxHeight: 300 }}>
              <Suspense fallback={<ChartFallback />}>
                <BarChart userKg={emissions.total} countries={COUNTRY_COMPARISONS} />
              </Suspense>
            </div>
            <div className="w-full mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Global average: 4,800 kg per capita</span>
              </div>
              <a href="#pledge" className="bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700 text-xs font-bold px-4 py-2 rounded-xl transition-colors w-full sm:w-auto text-center">
                Take Action Pledges
              </a>
            </div>
          </div>
        </div>

        {/* Carbon Budget */}
        <div className="mt-8 bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4">🌍 Paris Agreement Carbon Budget</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-600 dark:text-gray-400">Your footprint</span>
                <span className="text-gray-900 dark:text-white">{emissions.total.toLocaleString()} kg</span>
              </div>
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (emissions.total / 2000) * 100)}%` }} />
                <div className="absolute top-0 right-0 h-full border-r-2 border-dashed border-amber-500" style={{ width: '0', left: '100%' }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0 kg</span>
                <span>2,000 kg target</span>
              </div>
            </div>
            <div className="text-center sm:text-left shrink-0">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {emissions.total > 2000 ? '+' : ''}{((emissions.total - 2000) / 1000).toFixed(1)} tonnes
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {emissions.total <= 2000 ? 'Within Paris target ✓' : 'Over the 2-tonne budget'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Dashboard.displayName = 'Dashboard';
