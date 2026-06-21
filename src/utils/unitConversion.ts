import type { UnitSystem } from '../types';

/**
 * Converts a kg value to the target unit system.
 */
export function convertCO2(kg: number, to: UnitSystem): { value: string; unit: string } {
  switch (to) {
    case 'tonnes':
      return { value: (kg / 1000).toFixed(2), unit: 'tonnes' };
    case 'lbs':
      return { value: (kg * 2.20462).toFixed(0), unit: 'lbs' };
    default:
      return { value: kg.toLocaleString(), unit: 'kg' };
  }
}

/**
 * Returns a grade (A+ to F) based on total annual kg.
 */
export function getGrade(kg: number): { letter: string; color: string } {
  if (kg < 2000) return { letter: 'A+', color: '#10B981' };
  if (kg < 3000) return { letter: 'A', color: '#34D399' };
  if (kg < 4000) return { letter: 'B', color: '#6EE7B7' };
  if (kg < 4800) return { letter: 'C', color: '#FCD34D' };
  if (kg < 7000) return { letter: 'D', color: '#FBBF24' };
  if (kg < 10000) return { letter: 'E', color: '#F97316' };
  return { letter: 'F', color: '#EF4444' };
}
