import { Institute } from "./institute.constants";

export interface InstituteCutoffConfig {
  cutoff: number;   // expected competitive score
  slope: number;    // curve sharpness
}

export const INSTITUTE_CUTOFFS: Record<Institute, InstituteCutoffConfig> = {
  IIM_A: { cutoff: 92, slope: 5 }, // harsh, steep
  IIM_B: { cutoff: 90, slope: 6 },
  IIM_C: { cutoff: 88, slope: 7 }, // broader intake
};
