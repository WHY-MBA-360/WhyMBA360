import { InstituteCode } from "./dto/admission-probability.input";

/**
 * Input: normalized score (0–1)
 * Output: weighted probability (0–1)
 */
export function applyInstituteCutoffCurve(
  institute: InstituteCode,
  score: number
): number {
  switch (institute) {
    case "IIM_A":
      // Steep near top (elite filtering)
      return Math.pow(score, 2.2);

    case "IIM_B":
      // Balanced sigmoid
      return sigmoid(score, 8, 0.75);

    case "IIM_C":
      // Flatter, inclusive curve
      return Math.pow(score, 1.4);

    default:
      return score;
  }
}

/**
 * Generic sigmoid
 */
function sigmoid(
  x: number,
  steepness: number,
  midpoint: number
): number {
  return 1 / (1 + Math.exp(-steepness * (x - midpoint)));
}
