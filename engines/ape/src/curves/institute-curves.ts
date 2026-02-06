import { Institute } from "../dto/v1/admission-probability.input";

export interface CutoffCurve {
  cutoff: number;   // inflection point
  steepness: number; // curve sharpness
}

export const INSTITUTE_CURVES: Record<Institute, CutoffCurve> = {
  IIM_A: { cutoff: 98, steepness: 0.35 },
  IIM_B: { cutoff: 96, steepness: 0.28 },
  IIM_C: { cutoff: 94, steepness: 0.22 },
};
