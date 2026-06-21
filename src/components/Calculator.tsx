import React, { useState, useCallback, memo } from 'react';
import { CalculatorInputs, CategoryEmissions } from '../types';
import { Car, Zap, Utensils, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CalculatorProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: string | number) => void;
  emissions: CategoryEmissions;
}

type TabId = 'transport' | 'energy' | 'food' | 'shopping';

/** Reusable range slider with label and value */
const RangeSlider: React.FC<{
  label: string; value: number; min: number; max: number; step: number;
  unit?: string; disabled?: boolean; onChange: (v: number) => void;
  helpText?: string; ariaLabel?: string;
}> = memo(({ label, value, min, max, step, unit, disabled, onChange, helpText, ariaLabel }) => (
  <div className={`${disabled ? 'opacity-50' : ''}`}>
    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
      <span>{label}</span>
      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{value} {unit || ''}</span>
    </label>
    {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{helpText}</p>}
    <input
      type="range"
      min={min} max={max} step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-emerald-500"
      aria-label={ariaLabel || label}
      aria-valuemin={min} aria-valuemax={max} aria-valuenow={value}
    />
    <div className="flex justify-between text-[11px] text-gray-400 dark:text-gray-500 mt-1">
      <span>{min}{unit || ''}</span>
      <span>{Math.round((min+max)/2)}{unit || ''}</span>
      <span>{max}{unit || ''}</span>
    </div>
  </div>
));
RangeSlider.displayName = 'RangeSlider';

/** Stepper button group for integer values */
const Stepper: React.FC<{
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; subtitle?: string;
}> = memo(({ label, value, onChange, min = 0, max = 100, subtitle }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
    <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{label}</div>
    <div className="flex items-center justify-center space-x-3 my-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-sm"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
      >
        -
      </button>
      <span className="text-2xl font-black text-gray-900 dark:text-white w-8 text-center" aria-live="polite">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-sm"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
      >
        +
      </button>
    </div>
    {subtitle && <div className="text-[11px] text-gray-400 dark:text-gray-500">{subtitle}</div>}
  </div>
));
Stepper.displayName = 'Stepper';

export const Calculator: React.FC<CalculatorProps> = memo(({ inputs, onInputChange, emissions }) => {
  const [activeTab, setActiveTab] = useState<TabId>('transport');

  const handleChange = useCallback(
    (field: keyof CalculatorInputs) => (value: string | number) => onInputChange(field, value),
    [onInputChange]
  );

  const tabs = [
    { id: 'transport' as TabId, label: 'Transport', icon: Car, currentVal: emissions.transport },
    { id: 'energy' as TabId, label: 'Home Energy', icon: Zap, currentVal: emissions.homeEnergy },
    { id: 'food' as TabId, label: 'Food Habits', icon: Utensils, currentVal: emissions.food },
    { id: 'shopping' as TabId, label: 'Shopping & Life', icon: ShoppingBag, currentVal: emissions.shopping },
  ];

  return (
    <section id="calculator" className="py-24 bg-white dark:bg-gray-900 scroll-mt-20 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Interactive Emissions Calculator</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Analyze Your Annual Carbon Footprint</p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Fine-tune your lifestyle factors across four critical sectors. Values update in real-time instantly.</p>
        </div>

        <div className="bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700 rounded-3xl p-4 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Tabs */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">Select Category</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3" role="tablist" aria-label="Calculator categories">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 card-lift ${
                      isActive
                        ? 'bg-white dark:bg-gray-800 border-emerald-500 shadow-lg shadow-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                        : 'bg-white dark:bg-gray-800/60 border-gray-200/80 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-bold text-base text-gray-900 dark:text-white">{tab.label}</div>
                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5" aria-live="polite">
                          {tab.currentVal.toLocaleString()} kg CO₂/yr
                        </div>
                      </div>
                    </div>
                    {isActive && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 hidden sm:block" />}
                  </button>
                );
              })}
            </div>

            {/* Total indicator */}
            <div className="mt-auto pt-6 lg:pt-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-100 mb-1">Estimated Total Footprint</div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight my-2" aria-live="polite">
                  {emissions.total.toLocaleString()} <span className="text-lg font-bold text-emerald-200">kg CO₂/yr</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">Global average is 4,800 kg/year.</p>
                <a href="#dashboard" className="inline-flex items-center space-x-2 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all group w-full justify-center">
                  <span>View Full Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Tab Content */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm" role="tabpanel">
            {/* TRANSPORT */}
            {activeTab === 'transport' && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Car className="w-6 h-6 text-emerald-500" aria-hidden="true" /><span>Transport Emissions</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accounts for personal commuting, daily drives, transit, and flights.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" id="fuel-type-label">Primary Car Fuel Type</label>
                    <select
                      aria-labelledby="fuel-type-label"
                      value={inputs.carFuelType}
                      onChange={(e) => onInputChange('carFuelType', e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value="petrol">Petrol (Gasoline)</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid Electric</option>
                      <option value="electric">100% Electric (EV)</option>
                      <option value="none">No Car / Do Not Drive</option>
                    </select>
                  </div>
                  <RangeSlider label="Car Distance per Week" value={inputs.carKmPerWeek} min={0} max={1000} step={10} unit="km" disabled={inputs.carFuelType === 'none'} onChange={handleChange('carKmPerWeek')} ariaLabel="Weekly car distance in kilometers" />
                </div>
                {inputs.carFuelType !== 'none' && inputs.carFuelType !== 'electric' && (
                  <RangeSlider label="Fuel Efficiency" value={inputs.carEfficiency} min={3} max={20} step={0.5} unit="L/100km" onChange={handleChange('carEfficiency')} helpText="Lower = more efficient (compact ~5.5, SUV ~11.0)" ariaLabel="Car fuel efficiency" />
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" id="bike-type-label">Bike / Scooter Type</label>
                    <select aria-labelledby="bike-type-label" value={inputs.bikeType} onChange={(e) => onInputChange('bikeType', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      <option value="bicycle">Standard Bicycle (Zero CO₂)</option>
                      <option value="electric_bike">Electric E-Bike / E-Scooter</option>
                      <option value="motorcycle">Gasoline Motorcycle</option>
                    </select>
                  </div>
                  <RangeSlider label="Bike Distance per Week" value={inputs.bikeKmPerWeek} min={0} max={300} step={5} unit="km" onChange={handleChange('bikeKmPerWeek')} ariaLabel="Weekly bike distance in kilometers" />
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" id="pt-type-label">Public Transport</label>
                    <select aria-labelledby="pt-type-label" value={inputs.publicTransportType} onChange={(e) => onInputChange('publicTransportType', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      <option value="mixed">Mixed Bus / Metro / Train</option>
                      <option value="bus">Primarily City Bus</option>
                      <option value="subway">Electric Subway / Light Rail</option>
                      <option value="train">Intercity Passenger Rail</option>
                    </select>
                  </div>
                  <RangeSlider label="Transit Distance per Week" value={inputs.publicTransportKmPerWeek} min={0} max={500} step={10} unit="km" onChange={handleChange('publicTransportKmPerWeek')} ariaLabel="Weekly public transit distance" />
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                  <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Commercial Flights Per Year</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Stepper label="Short Haul (<3 hrs)" value={inputs.flightShortHaul} onChange={handleChange('flightShortHaul')} subtitle="e.g. domestic business trips" />
                    <Stepper label="Medium Haul (3-6 hrs)" value={inputs.flightMediumHaul} onChange={handleChange('flightMediumHaul')} subtitle="e.g. cross-country holidays" />
                    <Stepper label="Long Haul (>6 hrs)" value={inputs.flightLongHaul} onChange={handleChange('flightLongHaul')} subtitle="e.g. intercontinental flights" />
                  </div>
                </div>
              </div>
            )}

            {/* ENERGY */}
            {activeTab === 'energy' && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-emerald-500" aria-hidden="true" /><span>Home Energy Usage</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Heating, cooling, electricity, and clean grid share divided per household member.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <RangeSlider label="Household Size" value={inputs.householdSize} min={1} max={8} step={1} onChange={handleChange('householdSize')} helpText="Emissions are divided equally by residents" ariaLabel="Number of people in household" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                  <RangeSlider label="Monthly Electricity Usage" value={inputs.electricityKwhPerMonth} min={50} max={1500} step={25} unit="kWh" onChange={handleChange('electricityKwhPerMonth')} ariaLabel="Monthly electricity kilowatt-hours" />
                  <RangeSlider label="Renewable Energy Share" value={inputs.cleanEnergyPercentage} min={0} max={100} step={5} unit="%" onChange={handleChange('cleanEnergyPercentage')} ariaLabel="Percentage of renewable energy" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                  <RangeSlider label="Natural Gas per Month" value={inputs.gasM3PerMonth} min={0} max={300} step={5} unit="m³" onChange={handleChange('gasM3PerMonth')} ariaLabel="Monthly natural gas in cubic meters" />
                  <RangeSlider label="LPG / Propane per Month" value={inputs.lpgKgPerMonth} min={0} max={100} step={2} unit="kg" onChange={handleChange('lpgKgPerMonth')} ariaLabel="Monthly LPG in kilograms" />
                </div>
              </div>
            )}

            {/* FOOD */}
            {activeTab === 'food' && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Utensils className="w-6 h-6 text-emerald-500" aria-hidden="true" /><span>Food & Dietary Habits</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Agriculture and meat production produce significant greenhouse gas.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Select Primary Diet Profile</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'vegan' as const, label: 'Vegan', desc: 'Lowest (~700kg)' },
                      { id: 'vegetarian' as const, label: 'Vegetarian', desc: 'High efficiency (~1,050kg)' },
                      { id: 'pescatarian' as const, label: 'Pescatarian', desc: 'Moderate (~1,250kg)' },
                      { id: 'omnivore_light' as const, label: 'Omnivore Light', desc: 'Standard (~1,750kg)' },
                      { id: 'omnivore_heavy' as const, label: 'Omnivore Heavy', desc: 'High (~2,600kg)' },
                    ].map((diet) => (
                      <button
                        key={diet.id}
                        onClick={() => onInputChange('dietType', diet.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                          inputs.dietType === diet.id
                            ? 'bg-emerald-50/80 dark:bg-emerald-900/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-sm ring-1 ring-emerald-500/20'
                            : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        aria-pressed={inputs.dietType === diet.id}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          inputs.dietType === diet.id ? 'bg-emerald-500 border-emerald-600' : 'bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                        }`}>
                          {inputs.dietType === diet.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{diet.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{diet.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" id="food-waste-label">Food Waste Behavior</label>
                    <select aria-labelledby="food-waste-label" value={inputs.foodWaste} onChange={(e) => onInputChange('foodWaste', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      <option value="low">Low (Careful meal planning)</option>
                      <option value="medium">Medium (Average leftovers discarded)</option>
                      <option value="high">High (Frequently discard food)</option>
                    </select>
                  </div>
                  <RangeSlider label="Locally Sourced Food Share" value={inputs.localFoodPercentage} min={0} max={100} step={10} unit="%" onChange={handleChange('localFoodPercentage')} ariaLabel="Percentage of locally sourced food" />
                </div>
              </div>
            )}

            {/* SHOPPING */}
            {activeTab === 'shopping' && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                    <ShoppingBag className="w-6 h-6 text-emerald-500" aria-hidden="true" /><span>Shopping & Lifestyle</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manufacturing goods, tech, apparel, and recycling diligence.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Stepper label="New Apparel (items/mo)" value={inputs.clothingPurchasesPerMonth} onChange={handleChange('clothingPurchasesPerMonth')} subtitle="Garments & shoes" max={30} />
                  <Stepper label="Electronics (items/yr)" value={inputs.electronicsPerYear} onChange={handleChange('electronicsPerYear')} subtitle="Phones, laptops, gadgets" max={20} />
                  <Stepper label="New Furniture (items/yr)" value={inputs.furniturePerYear} onChange={handleChange('furniturePerYear')} subtitle="Large furniture & appliances" max={20} />
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" id="recycling-label">Recycling Frequency</label>
                    <select aria-labelledby="recycling-label" value={inputs.recyclingHabit} onChange={(e) => onInputChange('recyclingHabit', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      <option value="always">Always (Rigorous separation)</option>
                      <option value="sometimes">Sometimes (When convenient)</option>
                      <option value="rarely">Rarely / Never</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2" id="packaging-label">Packaging Preference</label>
                    <select aria-labelledby="packaging-label" value={inputs.packagingPreference} onChange={(e) => onInputChange('packagingPreference', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      <option value="minimal">Minimal / Bulk refills</option>
                      <option value="moderate">Moderate (Average)</option>
                      <option value="excessive">Excessive (Heavy plastic)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Values saved to active calculation engine</span>
              </div>
              <a href="#dashboard" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 transition-all w-full sm:w-auto text-center">
                Inspect Dashboard Results
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Calculator.displayName = 'Calculator';
