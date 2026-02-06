import { Institute } from "./admission-probability.input";

/**
 * APE v1 — Admission Probability Output
 * ?? IMMUTABLE CONTRACT
 */
export interface AdmissionProbabilityOutputV1 {
  institute: Institute;
  probability: number; // 0–100

  breakdown: {
    score: number;
    academics: number;
    workEx: number;
  };

  reasons?: string[];
}
