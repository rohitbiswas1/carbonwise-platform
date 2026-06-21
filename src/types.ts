/**
 * Core type definitions for CarbonWise platform.
 */

export interface CalculatorInputs {
  // Transport
  carKmPerWeek: number;
  carFuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'none';
  carEfficiency: number;
  bikeKmPerWeek: number;
  bikeType: 'motorcycle' | 'electric_bike' | 'bicycle';
  flightShortHaul: number;
  flightMediumHaul: number;
  flightLongHaul: number;
  publicTransportKmPerWeek: number;
  publicTransportType: 'bus' | 'train' | 'subway' | 'mixed';

  // Home Energy
  householdSize: number;
  electricityKwhPerMonth: number;
  cleanEnergyPercentage: number;
  gasM3PerMonth: number;
  lpgKgPerMonth: number;

  // Food Habits
  dietType: 'vegan' | 'vegetarian' | 'pescatarian' | 'omnivore_light' | 'omnivore_heavy';
  foodWaste: 'low' | 'medium' | 'high';
  localFoodPercentage: number;

  // Shopping & Lifestyle
  clothingPurchasesPerMonth: number;
  electronicsPerYear: number;
  furniturePerYear: number;
  recyclingHabit: 'always' | 'sometimes' | 'rarely';
  packagingPreference: 'minimal' | 'moderate' | 'excessive';
}

export interface CategoryEmissions {
  transport: number;
  homeEnergy: number;
  food: number;
  shopping: number;
  total: number;
}

export interface Tip {
  id: number;
  title: string;
  category: 'Transport' | 'Energy' | 'Food' | 'Lifestyle';
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  co2SavedKg: number;
  icon: string;
}

export interface Fact {
  id: number;
  title: string;
  statement: string;
  source: string;
  year: number;
}

export interface GlobalStat {
  id: number;
  value: string;
  label: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface PledgeItem {
  id: string;
  title: string;
  description: string;
  category: 'Transport' | 'Energy' | 'Food' | 'Lifestyle';
  co2ReductionEstimate: number;
  icon: string;
}

export interface OffsetProgram {
  id: string;
  name: string;
  organization: string;
  description: string;
  costPerTon: number;
  certification: string;
  url: string;
  image: string;
  category: 'Reforestation' | 'Renewable Energy' | 'Methane Capture' | 'Biodiversity';
}

export interface CountryComparison {
  country: string;
  averageKg: number;
  flag: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  emissions: CategoryEmissions;
}

export type UnitSystem = 'kg' | 'tonnes' | 'lbs';

export type Theme = 'light' | 'dark';
