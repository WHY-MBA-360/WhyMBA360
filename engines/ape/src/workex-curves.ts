import { InstituteCode } from "./dto/admission-probability.input";

/**
 * Input: work experience in months
 * Output: normalized preference score (0–1)
 */
export function applyWorkExCurve(
  institute: InstituteCode,
  workExMonths: number
): number {
  const years = workExMonths / 12;

  switch (institute) {
    case "IIM_A":
      // Peak around 3 years, penalize extremes
      return gaussian(years, 3, 1.2);

    case "IIM_B":
      // Strong preference for higher work-ex
      return sigmoid(years, 1.5, 2.5);

    case "IIM_C":
      // Broad acceptance
      return Math.min(1, years / 5);

    default:
      return Math.min(1, years / 4);
  }
}

/**
 * Gaussian bell curve
 */
function gaussian(
  x: number,
  mean: number,
  stdDev: number
): number {
  return Math.exp(
    -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))
  );
}

/**
 * Sigmoid growth
 */
function sigmoid(
  x: number,
  steepness: number,
  midpoint: number
): number {
  return 1 / (1 + Math.exp(-steepness * (x - midpoint)));
}
