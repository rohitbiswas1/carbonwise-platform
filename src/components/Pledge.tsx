import React, { useState, useCallback, useMemo, memo } from 'react';
import { PLEDGE_ITEMS } from '../data/constants';
import {
  CheckCircle2, Award, Share2, Printer, Leaf, Sparkles, Salad, Bike,
  Power, Plane, ShoppingBag, Shirt, Smartphone, Copy
} from 'lucide-react';
import { useLocalStorage, useInView } from '../hooks';

interface PledgeProps {
  userTotalEmissions: number;
}

const pledgeIconMap: Record<string, React.ReactNode> = {
  Salad: <Salad className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Bike: <Bike className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Power: <Power className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Plane: <Plane className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Shirt: <Shirt className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Leaf: <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  Smartphone: <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
};

function triggerConfetti() {
  try {
    // Use dynamic import to avoid issues with canvas-confetti
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#34D399', '#A7F3D0'],
      });
    }).catch(() => { /* confetti unavailable */ });
  } catch { /* ignore */ }
}

export const Pledge: React.FC<PledgeProps> = memo(({ userTotalEmissions }) => {
  const [selectedPledges, setSelectedPledges] = useLocalStorage<string[]>('carbonwise-pledges', ['p1', 'p2', 'p5']);
  const [userName, setUserName] = useLocalStorage('carbonwise-name', 'Jane Doe');
  const [isCommitted, setIsCommitted] = useState(false);
  const [baseCount, setBaseCount] = useLocalStorage('carbonwise-pledge-count', 12842);
  const [showCopied, setShowCopied] = useState(false);
  const [pledgeRef, pledgeInView] = useInView();

  const togglePledge = useCallback((id: string) => {
    setSelectedPledges((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter(p => p !== id);
      }
      return [...prev, id];
    });
  }, [setSelectedPledges]);

  const totalReductionEstimate = useMemo(
    () => selectedPledges.reduce((acc, currId) => {
      const item = PLEDGE_ITEMS.find(p => p.id === currId);
      return acc + (item ? item.co2ReductionEstimate : 0);
    }, 0),
    [selectedPledges]
  );

  const handleCommit = useCallback(() => {
    setIsCommitted(true);
    setBaseCount((prev) => prev + 1);
    triggerConfetti();
  }, [setBaseCount]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleShare = useCallback(() => {
    const text = `I pledged to reduce my carbon footprint by ${totalReductionEstimate} kg CO₂/year on CarbonWise! 🌍`;
    if (navigator.share) {
      navigator.share({ title: 'My CarbonWise Pledge', text, url: window.location.href })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }).catch(() => alert(text));
    }
  }, [totalReductionEstimate]);

  return (
    <section id="pledge" className="py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Take Real Action Today</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Commit to the Green Action Pledge</p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Select commitments, track momentum, and generate your certificate.</p>
        </div>

        {/* Pledge Counter */}
        <div className="max-w-4xl mx-auto mb-16 bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-md shrink-0">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Live Community Pledges</span>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mt-0.5">
                {(baseCount + (isCommitted ? 1 : 0)).toLocaleString()} <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">Pledges</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-700 px-6 py-4 rounded-2xl text-center w-full sm:w-auto">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider mb-1">Your Est. Reduction</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{totalReductionEstimate} kg CO₂/yr</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Pledge Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">1. Select Your Pledges</h3>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full">{selectedPledges.length} Selected</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {PLEDGE_ITEMS.map((item) => {
                const isSelected = selectedPledges.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePledge(item.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePledge(item.id); }}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                      isSelected
                        ? 'bg-white dark:bg-gray-700 border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/10'
                        : 'bg-white/60 dark:bg-gray-800/40 border-gray-200/80 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700/50 hover:shadow-sm'
                    }`}
                  >
                    <div className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="p-1 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 inline-block shrink-0">
                            {pledgeIconMap[item.icon] || <Leaf className="w-5 h-5 text-emerald-600" />}
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white text-base truncate">{item.title}</span>
                        </div>
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">-{item.co2ReductionEstimate} kg/yr</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Certificate & Customizer */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">2. Generate Certificate</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter your name to personalize your pledge certificate.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" htmlFor="pledge-name">Your Full Name</label>
                  <input
                    id="pledge-name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                {!isCommitted ? (
                  <button onClick={handleCommit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 text-base">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span>Confirm & Commit Pledges</span>
                  </button>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 p-4 rounded-2xl text-center space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Pledge Confirmed!</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 pt-2 border-t border-emerald-100 dark:border-emerald-700">
                      <button onClick={handlePrint} className="inline-flex items-center space-x-2 bg-white dark:bg-gray-700 border border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-gray-600 font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-all">
                        <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Print</span>
                      </button>
                      <button onClick={handleShare} className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-all">
                        {showCopied ? <><Copy className="w-4 h-4" /><span>Copied!</span></> : <><Share2 className="w-4 h-4" /><span>Share</span></>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certificate Preview */}
            <div ref={pledgeRef} id="pledge-certificate" className={`bg-white dark:bg-gray-800 border-8 border-emerald-700 dark:border-emerald-600 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden text-center transition-all duration-700 ${pledgeInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none"><Leaf className="w-full h-full text-emerald-900" /></div>
              <div className="border-2 border-emerald-200 dark:border-emerald-600 p-6 rounded-2xl relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-gray-700 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-inner">
                    <Award className="w-8 h-8" aria-hidden="true" />
                  </div>
                </div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300 mb-1">Official Certificate of Commitment</h4>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 dark:text-white tracking-tight">CarbonWise Stewardship</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 my-4 uppercase tracking-wider font-semibold">This certifies that</p>
                <div className="py-2 px-4 bg-emerald-50/80 dark:bg-emerald-900/40 rounded-xl border border-emerald-200/80 dark:border-emerald-700 my-2 inline-block min-w-[240px]">
                  <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100 tracking-tight">{userName || 'Ecological Hero'}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium mt-4 mb-6 max-w-sm mx-auto">
                  Has pledged <span className="font-bold text-gray-900 dark:text-white">{selectedPledges.length} sustainability actions</span>, saving an estimated <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{totalReductionEstimate} kg CO₂</span> against a footprint of {userTotalEmissions.toLocaleString()} kg/yr.
                </p>
                <div className="text-left bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600 mb-6 space-y-1.5 max-h-32 overflow-y-auto text-xs">
                  <div className="font-bold text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-wider mb-2">Committed Actions:</div>
                  {selectedPledges.map(id => {
                    const item = PLEDGE_ITEMS.find(p => p.id === id);
                    return <div key={id} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /><span className="truncate">{item?.title}</span></div>;
                  })}
                </div>
                <div className="pt-6 border-t border-emerald-200 dark:border-emerald-600 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                  <div><span className="block text-gray-900 dark:text-white font-serif lowercase italic text-base">CarbonWise Org</span><span>Verified Registry</span></div>
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-sm">ECO</div>
                  <div><span className="block text-gray-900 dark:text-white font-serif italic text-base">{new Date().getFullYear()}</span><span>Issuance Date</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Pledge.displayName = 'Pledge';
