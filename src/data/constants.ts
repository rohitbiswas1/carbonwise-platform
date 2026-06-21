import {
  Tip, Fact, GlobalStat, PledgeItem, OffsetProgram,
  CalculatorInputs, CategoryEmissions, CountryComparison
} from '../types';

/** Default user values for the calculator */
export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  carKmPerWeek: 150,
  carFuelType: 'petrol',
  carEfficiency: 7.5,
  bikeKmPerWeek: 20,
  bikeType: 'bicycle',
  flightShortHaul: 2,
  flightMediumHaul: 1,
  flightLongHaul: 0,
  publicTransportKmPerWeek: 60,
  publicTransportType: 'mixed',
  householdSize: 2,
  electricityKwhPerMonth: 250,
  cleanEnergyPercentage: 30,
  gasM3PerMonth: 40,
  lpgKgPerMonth: 0,
  dietType: 'omnivore_light',
  foodWaste: 'medium',
  localFoodPercentage: 30,
  clothingPurchasesPerMonth: 2,
  electronicsPerYear: 2,
  furniturePerYear: 1,
  recyclingHabit: 'sometimes',
  packagingPreference: 'moderate',
};

/**
 * Calculates annual CO2 emissions in kg based on user inputs.
 * Uses scientifically-derived emission factors per category.
 */
export function calculateEmissions(inputs: CalculatorInputs): CategoryEmissions {
  // 1. TRANSPORT
  const carCo2Map: Record<string, number> = {
    petrol: 2.31, diesel: 2.68, hybrid: 1.6, electric: 0.05,
  };
  const carCo2PerKm = inputs.carFuelType === 'none'
    ? 0
    : (inputs.carEfficiency / 100) * (carCo2Map[inputs.carFuelType] || 0);
  const carEmissions = inputs.carKmPerWeek * 52 * carCo2PerKm;

  const bikeCo2Map: Record<string, number> = { bicycle: 0, electric_bike: 0.015, motorcycle: 0.11 };
  const bikeEmissions = inputs.bikeKmPerWeek * 52 * (bikeCo2Map[inputs.bikeType] || 0);

  const flightEmissions =
    inputs.flightShortHaul * 150 +
    inputs.flightMediumHaul * 420 +
    inputs.flightLongHaul * 1100;

  const ptCo2Map: Record<string, number> = { bus: 0.089, train: 0.035, subway: 0.028, mixed: 0.06 };
  const ptEmissions = inputs.publicTransportKmPerWeek * 52 * (ptCo2Map[inputs.publicTransportType] || 0.06);

  const transportTotal = Math.round(carEmissions + bikeEmissions + flightEmissions + ptEmissions);

  // 2. HOME ENERGY
  const dirtyElectricKwh = inputs.electricityKwhPerMonth * (1 - inputs.cleanEnergyPercentage / 100);
  const electricEmissions = dirtyElectricKwh * 12 * 0.45;
  const gasEmissions = inputs.gasM3PerMonth * 12 * 2.02;
  const lpgEmissions = inputs.lpgKgPerMonth * 12 * 3.0;
  const homeEnergyTotal = Math.round(
    (electricEmissions + gasEmissions + lpgEmissions) / Math.max(1, inputs.householdSize)
  );

  // 3. FOOD
  const dietBase: Record<string, number> = {
    vegan: 700, vegetarian: 1050, pescatarian: 1250,
    omnivore_light: 1750, omnivore_heavy: 2600,
  };
  const dietEmissions = dietBase[inputs.dietType] || 1500;
  const wasteMult = inputs.foodWaste === 'low' ? 0.9 : inputs.foodWaste === 'high' ? 1.25 : 1.0;
  const localDiscount = (inputs.localFoodPercentage / 100) * 0.15;
  const foodTotal = Math.round(dietEmissions * wasteMult * (1 - localDiscount));

  // 4. SHOPPING
  const clothingEmissions = inputs.clothingPurchasesPerMonth * 12 * 25;
  const electronicEmissions = inputs.electronicsPerYear * 150;
  const furnitureEmissions = inputs.furniturePerYear * 100;
  let lifestyleMult = 1.0;
  if (inputs.recyclingHabit === 'always') lifestyleMult -= 0.15;
  if (inputs.recyclingHabit === 'rarely') lifestyleMult += 0.20;
  if (inputs.packagingPreference === 'minimal') lifestyleMult -= 0.10;
  if (inputs.packagingPreference === 'excessive') lifestyleMult += 0.25;
  const shoppingTotal = Math.round(
    (clothingEmissions + electronicEmissions + furnitureEmissions + 200) * Math.max(0.3, lifestyleMult)
  );

  const total = transportTotal + homeEnergyTotal + foodTotal + shoppingTotal;

  return { transport: transportTotal, homeEnergy: homeEnergyTotal, food: foodTotal, shopping: shoppingTotal, total };
}

export const GLOBAL_AVERAGE_KG = 4800;

/** Country comparison data */
export const COUNTRY_COMPARISONS: CountryComparison[] = [
  { country: 'Global Average', averageKg: 4800, flag: '🌍' },
  { country: 'India', averageKg: 1900, flag: '🇮🇳' },
  { country: 'United Kingdom', averageKg: 5500, flag: '🇬🇧' },
  { country: 'China', averageKg: 8200, flag: '🇨🇳' },
  { country: 'United States', averageKg: 14000, flag: '🇺🇸' },
];

export const TOP_10_TIPS: Tip[] = [
  { id: 1, title: 'Switch to Renewable Energy', category: 'Energy',
    description: 'Transition your home to solar, wind, or a verified green utility tariff — the single biggest step to slash residential emissions.',
    impact: 'High', co2SavedKg: 1450, icon: 'Sun' },
  { id: 2, title: 'Adopt a Plant-Rich Diet', category: 'Food',
    description: 'Reducing red meat and dairy 2-3 days/week significantly cuts methane emissions, deforestation, and water usage.',
    impact: 'High', co2SavedKg: 920, icon: 'Apple' },
  { id: 3, title: 'Drive Less, Walk or Cycle More', category: 'Transport',
    description: 'Replace car trips under 5km with cycling or walking — eliminates direct tailpipe exhaust and keeps you healthy.',
    impact: 'High', co2SavedKg: 780, icon: 'Bike' },
  { id: 4, title: 'Minimize Air Travel & Fly Direct', category: 'Transport',
    description: 'Take trains regionally. When flying is needed, choose direct flights and pack lighter — takeoff/landing burn the most fuel.',
    impact: 'High', co2SavedKg: 1100, icon: 'Plane' },
  { id: 5, title: 'Eliminate Household Food Waste', category: 'Food',
    description: 'Up to 30% of food is wasted globally. Plan meals, freeze leftovers, and compost scraps to stop methane in landfills.',
    impact: 'Medium', co2SavedKg: 340, icon: 'Utensils' },
  { id: 6, title: 'Upgrade to Heat Pump & LED', category: 'Energy',
    description: 'Replace bulbs with LEDs and gas boilers with electric heat pumps — modern heat pumps operate at 300%+ efficiency.',
    impact: 'Medium', co2SavedKg: 620, icon: 'Lightbulb' },
  { id: 7, title: 'Practice Slow Fashion', category: 'Lifestyle',
    description: 'Fashion produces 10% of global emissions. Buy durable clothes, repair damaged items, and buy vintage.',
    impact: 'Medium', co2SavedKg: 280, icon: 'Shirt' },
  { id: 8, title: 'Use Smart Thermostats', category: 'Energy',
    description: 'Lower heating by just 1°C in winter and unplug standby vampire electronics when not in use.',
    impact: 'Medium', co2SavedKg: 310, icon: 'Gauge' },
  { id: 9, title: 'Extend Electronics Lifespan', category: 'Lifestyle',
    description: 'Manufacturing a phone takes immense energy. Keeping your phone 4 years instead of 2 halves its lifecycle impact.',
    impact: 'Low', co2SavedKg: 160, icon: 'Laptop' },
  { id: 10, title: 'Demand Clean Divestment', category: 'Lifestyle',
    description: 'Move savings to institutions that refuse fossil fuels and actively support clean tech and green bonds.',
    impact: 'High', co2SavedKg: 1800, icon: 'Landmark' },
];

export const DID_YOU_KNOW_FACTS: Fact[] = [
  { id: 1, title: 'The Greenhouse Gas Blanket',
    statement: 'CO₂ levels are 50% higher than pre-industrial times, acting like a thermal blanket trapping solar radiation.',
    source: 'World Meteorological Organization (WMO)', year: 2024 },
  { id: 2, title: 'Deforestation Impact',
    statement: 'Global forests absorb ~15.6 billion tonnes of CO₂ yearly. Protecting natural forests is as urgent as planting new ones.',
    source: 'World Resources Institute', year: 2025 },
  { id: 3, title: 'Methane vs CO₂',
    statement: 'Methane is 28x more potent at trapping heat than CO₂ over 100 years, but breaks down faster in the atmosphere.',
    source: 'Intergovernmental Panel on Climate Change (IPCC)', year: 2023 },
  { id: 4, title: 'Concrete & Cement',
    statement: 'If the cement industry were a country, it would be the third-largest carbon emitter after China and the US.',
    source: 'International Energy Agency (IEA)', year: 2024 },
  { id: 5, title: 'Solar Acceleration',
    statement: 'Global renewable capacity is expanding faster than any time in 30 years, providing a clear path to net-zero.',
    source: 'IEA Renewables Report', year: 2025 },
];

export const GLOBAL_STATS: GlobalStat[] = [
  { id: 1, value: '37.4 Billion', label: 'Tonnes of global CO₂ per year',
    description: 'Fossil fuel combustion remains the overwhelming driver of GHG outputs.', trend: 'up' },
  { id: 2, value: '4.8 Tonnes', label: 'Global average per person',
    description: 'Western developed nations often average 12–16 tonnes per capita annually.', trend: 'neutral' },
  { id: 3, value: '1.2°C', label: 'Temperature rise above pre-industrial',
    description: 'Paris Agreement targets limiting warming to 1.5°C above baseline (1850-1900).', trend: 'up' },
  { id: 4, value: '42%+', label: 'Global electricity from clean sources',
    description: 'Solar, wind, hydro & nuclear reached an all-time high milestone across major grids.', trend: 'down' },
];

export const PLEDGE_ITEMS: PledgeItem[] = [
  { id: 'p1', title: 'Meat-Free Mondays & Beyond',
    description: 'Eat entirely veg or vegan meals at least 2 full days every week.', category: 'Food', co2ReductionEstimate: 260, icon: 'Salad' },
  { id: 'p2', title: 'Conscious Commuter',
    description: 'Walk, bike, or take public transit for all short errands under 3 km.', category: 'Transport', co2ReductionEstimate: 420, icon: 'Bike' },
  { id: 'p3', title: 'Vampire Power Slayer',
    description: 'Unplug idle chargers, coffee makers, and standby electronics daily.', category: 'Energy', co2ReductionEstimate: 120, icon: 'Power' },
  { id: 'p4', title: 'Flight Conscious & Offsetter',
    description: 'Avoid one annual unnecessary flight or fully offset unavoidable air miles.', category: 'Transport', co2ReductionEstimate: 850, icon: 'Plane' },
  { id: 'p5', title: 'Zero Single-Use Plastics',
    description: 'Carry reusable water bottle, cloth bags, and refuse disposable plastic.', category: 'Lifestyle', co2ReductionEstimate: 95, icon: 'ShoppingBag' },
  { id: 'p6', title: 'Eco Cold-Wash Champion',
    description: 'Wash laundry in cold water (30°C or below) and hang-dry whenever possible.', category: 'Energy', co2ReductionEstimate: 180, icon: 'Shirt' },
  { id: 'p7', title: 'Vigilant Waste Composter',
    description: 'Separate organic kitchen scraps for municipal or garden compost bins.', category: 'Food', co2ReductionEstimate: 140, icon: 'Leaf' },
  { id: 'p8', title: 'Secondhand Tech & Apparel',
    description: 'Buy next phone or jacket refurbished/secondhand instead of brand new.', category: 'Lifestyle', co2ReductionEstimate: 210, icon: 'Smartphone' },
];

export const OFFSET_PROGRAMS: OffsetProgram[] = [
  {
    id: 'ind-1',
    name: 'SankalpTaru Foundation',
    organization: 'SankalpTaru',
    description: "India's largest tech-enabled tree plantation platform. Plants native species across Maharashtra, Rajasthan and Uttarakhand with GPS-tracked tree adoption and real-time growth updates via mobile app.",
    costPerTon: 8,
    certification: 'Verified Carbon Standard (VCS) & Gold Standard',
    url: 'https://sankalptaru.org',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&fit=crop',
    category: 'Reforestation',
  },
  {
    id: 'ind-2',
    name: 'Wildlife Trust of India',
    organization: 'Wildlife Trust of India',
    description: 'Restores critical wildlife corridors and forest patches across central India tiger reserves and elephant habitats. Funds native tree planting and anti-poaching measures simultaneously.',
    costPerTon: 10,
    certification: 'Ministry of Environment India Approved & FCRA',
    url: 'https://www.wti.org.in',
    image: 'https://images.unsplash.com/photo-1516026972055-7170a53b53f6?w=600&fit=crop',
    category: 'Biodiversity',
  },
  {
    id: 'ind-3',
    name: 'TERI - Clean Cooking India',
    organization: 'The Energy and Resources Institute',
    description: "Funds biogas digesters and clean LPG cookstoves for rural Indian households replacing biomass burning. TERI is India's premier energy research institution founded in 1974.",
    costPerTon: 12,
    certification: 'Bureau of Energy Efficiency (BEE) & CDM Registered',
    url: 'https://www.teriin.org',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&fit=crop',
    category: 'Renewable Energy',
  },
  {
    id: 'ind-4',
    name: 'Grow-Trees India',
    organization: 'Grow-Trees.com',
    description: 'Plants trees across 25+ Indian states including Sundarbans mangroves, urban forests in Delhi and Mumbai, and tribal lands. Provides GPS certificates and quarterly satellite monitoring reports.',
    costPerTon: 6,
    certification: 'ISO 14064 & FSC India Certified',
    url: 'https://www.grow-trees.com',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&fit=crop',
    category: 'Reforestation',
  },
];
