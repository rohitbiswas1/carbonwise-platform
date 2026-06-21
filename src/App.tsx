import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { CalculatorInputs, HistoryEntry, UnitSystem, Theme } from './types';
import { DEFAULT_CALCULATOR_INPUTS, calculateEmissions } from './data/constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { Dashboard } from './components/Dashboard';
import { Awareness } from './components/Awareness';
import { Pledge } from './components/Pledge';
import { Offset } from './components/Offset';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

const HistoryTracker = lazy(() => import('./components/HistoryTracker'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));

/**
 * Root application component for CarbonWise platform.
 * Manages global state, dark mode, unit system, and calculation history.
 */
export const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_CALCULATOR_INPUTS);
  const [darkMode, setDarkMode] = useState<Theme>('light');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('kg');
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('carbonwise-history', []);

  /** Memoized emission calculation */
  const emissions = useMemo(() => calculateEmissions(inputs), [inputs]);

  /** Toggle dark mode on <html> element */
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  /** Unit system toggle */
  const toggleUnit = useCallback(() => {
    setUnitSystem((prev) => prev === 'kg' ? 'tonnes' : prev === 'tonnes' ? 'lbs' : 'kg');
  }, []);

  /** Save current calculation to history */
  const saveToHistory = useCallback(() => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      emissions,
    };
    setHistory((prev) => [entry, ...prev].slice(0, 5));
  }, [emissions, setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  /** Handle calculator field changes */
  const handleInputChange = useCallback(
    (field: keyof CalculatorInputs, value: string | number) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode === 'dark'
        ? 'bg-gray-900 text-gray-100 dark'
        : 'bg-gray-50 text-gray-900'
    } selection:bg-emerald-100 selection:text-emerald-900 dark:selection:bg-emerald-800 dark:selection:text-emerald-100`}>
      
      {/* Skip to content link for accessibility */}
      <a href="#calculator" className="skip-link">
        Skip to Calculator
      </a>

      <Navbar
        totalEmissions={emissions.total}
        darkMode={darkMode === 'dark'}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1">
        <Hero />
        
        <ErrorBoundary>
          <Calculator
            inputs={inputs}
            onInputChange={handleInputChange}
            emissions={emissions}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <Dashboard
            emissions={emissions}
            unitSystem={unitSystem}
            onUnitToggle={toggleUnit}
          />
        </ErrorBoundary>

        {/* Save button & History */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 -mt-8 mb-8">
          <div className="flex justify-center">
            <button
              onClick={saveToHistory}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md shadow-emerald-500/20 transition-all"
              aria-label="Save current calculation to history"
            >
              💾 Save to History
            </button>
          </div>
          <Suspense fallback={null}>
            {history.length > 0 && (
              <HistoryTracker history={history} onClear={clearHistory} />
            )}
          </Suspense>
        </div>

        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="py-24 text-center text-gray-500 dark:text-gray-400">Loading leaderboard...</div>
            }
          >
            <Leaderboard userFootprint={emissions.total} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Awareness />
        </ErrorBoundary>

        <ErrorBoundary>
          <Pledge userTotalEmissions={emissions.total} />
        </ErrorBoundary>

        <ErrorBoundary>
          <Offset userTotalEmissions={emissions.total} />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

export default App;
