import { Ingredient } from '../types/recipe';

/**
 * Converts decimal to human-friendly culinary fraction (e.g. 1.5 -> "1 1/2", 0.33 -> "1/3")
 */
export function formatFraction(val: number): string {
  if (val <= 0) return '0';
  
  const whole = Math.floor(val);
  const remainder = val - whole;
  
  if (remainder < 0.08) {
    return whole > 0 ? `${whole}` : '0';
  }
  
  let frac = '';
  if (remainder >= 0.08 && remainder < 0.2) frac = '1/8';
  else if (remainder >= 0.2 && remainder < 0.3) frac = '1/4';
  else if (remainder >= 0.3 && remainder < 0.42) frac = '1/3';
  else if (remainder >= 0.42 && remainder < 0.6) frac = '1/2';
  else if (remainder >= 0.6 && remainder < 0.7) frac = '2/3';
  else if (remainder >= 0.7 && remainder < 0.85) frac = '3/4';
  else if (remainder >= 0.85 && remainder < 0.95) frac = '7/8';
  else {
    return `${whole + 1}`;
  }
  
  return whole > 0 ? `${whole} ${frac}` : frac;
}

export function scaleIngredient(
  ing: Ingredient,
  targetServings: number,
  baseServings: number,
  isMetric: boolean
): { amountDisplay: string; unitDisplay: string } {
  const ratio = targetServings / (baseServings || 1);
  
  if (isMetric && ing.metricAmount) {
    const scaledMetric = ing.metricAmount * ratio;
    const rounded = scaledMetric >= 10 ? Math.round(scaledMetric) : Math.round(scaledMetric * 10) / 10;
    return {
      amountDisplay: `${rounded}`,
      unitDisplay: ing.metricUnit || ing.unit
    };
  }
  
  const scaledAmount = ing.amount * ratio;
  return {
    amountDisplay: formatFraction(scaledAmount),
    unitDisplay: ing.unit
  };
}
