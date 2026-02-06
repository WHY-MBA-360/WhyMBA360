import { CollegeCode } from "./dto/admission-probability.input";

export interface WeightProfile {
  score: number;
  academics: number;
  workEx: number;
}

export const COLLEGE_WEIGHTS: Record<CollegeCode, WeightProfile> = {
  IIM_A: {
    score: 0.55,
    academics: 0.35,
    workEx: 0.10,
  },
  IIM_B: {
    score: 0.50,
    academics: 0.25,
    workEx: 0.25,
  },
  IIM_C: {
    score: 0.65,
    academics: 0.20,
    workEx: 0.15,
  },
};
