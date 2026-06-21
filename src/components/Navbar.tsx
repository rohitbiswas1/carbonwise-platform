import React, { useState, useEffect, useCallback, memo } from 'react';
import { Leaf, Menu, X, BarChart2, Moon, Sun, ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface NavbarProps {
  totalEmissions: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Tips & Awareness', href: '#awareness' },
    { label: 'Pledge & Act', href: '#pledge' },
    { label: 'Offset', href: '#offset' },
    { label: 'Leaderboard', href: '#leaderboard' },
  ];

export const Navbar: React.FC<NavbarProps> = memo(({ totalEmissions, darkMode, onToggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all transform hover:-translate-y-1 active:translate-y-0 no-print"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 border-b border-gray-100 dark:border-gray-800'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2 group" aria-label="Go to top">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/30">
              <Leaf className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Carbon<span className="text-emerald-500">Wise</span>
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                Awareness Platform
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Dark mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="#dashboard"
              className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-200 shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/70 transition-colors"
              aria-label={`Your total emissions: ${totalEmissions.toLocaleString()} kilograms per year`}
            >
              <BarChart2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Your Total: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{totalEmissions.toLocaleString()} kg</span> CO₂/yr</span>
            </a>

            <a
              href="#calculator"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Calculate Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="#dashboard" className="sm:hidden flex items-center bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 px-2.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-200">
              <span>{totalEmissions.toLocaleString()} kg</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pt-2 pb-6 space-y-1 shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3 px-2">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">Est. Personal Footprint:</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">{totalEmissions.toLocaleString()} kg CO₂/yr</span>
              </div>
              <a
                href="#calculator"
                onClick={closeMobile}
                className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md"
              >
                Update Calculator Values
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

Navbar.displayName = 'Navbar';
