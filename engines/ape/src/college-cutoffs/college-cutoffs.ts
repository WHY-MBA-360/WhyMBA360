import { CollegeCode } from "./college-code";
import { CollegeCutoff } from "./college-cutoff";

export const COLLEGE_CUTOFFS: Record<CollegeCode, CollegeCutoff> = {
  IIM_A: {
    minProbability: 0.85,
    strongBand: 0.92,
  },
  IIM_B: {
    minProbability: 0.78,
    strongBand: 0.88,
  },
  IIM_C: {
    minProbability: 0.72,
    strongBand: 0.85,
  },
};
