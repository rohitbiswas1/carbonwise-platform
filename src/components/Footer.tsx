import React, { useState, memo, useCallback } from 'react';
import { Leaf, Globe, Share2, ExternalLink, MessageCircle, Send, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = memo(() => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  }, [email]);

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-20 pb-12 overflow-hidden border-t border-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-gray-800">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                <Leaf className="w-6 h-6 animate-pulse" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Carbon<span className="text-emerald-400">Wise</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-normal max-w-sm">
              A frontend awareness initiative providing tools to calculate, interpret, reduce, and offset annual GHG contributions.
            </p>
            <div className="flex items-center space-x-3" aria-label="Social media links">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-500 hover:text-white text-gray-400 flex items-center justify-center transition-colors shadow-sm" aria-label="Twitter"><MessageCircle className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-500 hover:text-white text-gray-400 flex items-center justify-center transition-colors shadow-sm" aria-label="LinkedIn"><Share2 className="w-5 h-5" /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-500 hover:text-white text-gray-400 flex items-center justify-center transition-colors shadow-sm" aria-label="GitHub"><Globe className="w-5 h-5" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-emerald-500 hover:text-white text-gray-400 flex items-center justify-center transition-colors shadow-sm" aria-label="Facebook"><ExternalLink className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-6">Sections</h4>
            <ul className="space-y-3.5 text-sm font-medium text-gray-400">
              <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Calculator</a></li>
              <li><a href="#dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</a></li>
              <li><a href="#awareness" className="hover:text-emerald-400 transition-colors">Awareness</a></li>
              <li><a href="#pledge" className="hover:text-emerald-400 transition-colors">Pledge</a></li>
              <li><a href="#offset" className="hover:text-emerald-400 transition-colors">Offset</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-6">Subscribe</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">Bi-weekly digest on solar tech, personal impact, and clean energy milestones.</p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 flex-1 font-medium"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 text-sm">
                  <span>Join</span>
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs font-bold flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
            <div className="p-4 bg-gray-800/80 rounded-2xl border border-gray-700/80 flex items-center space-x-3 text-xs text-gray-400 font-medium">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>Hosted on carbon-neutral global infrastructure powered by 100% renewable energy.</span>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-medium">
          <div>&copy; {new Date().getFullYear()} CarbonWise Platform. Built for a greener tomorrow.</div>
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span>for Planet Earth</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
