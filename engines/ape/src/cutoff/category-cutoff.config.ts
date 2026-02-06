import { Category } from "../category/category.constants";

export interface CategoryCutoffConfig {
  cutoff: number;   // expected cutoff score
  slope: number;    // curve steepness
}

export const CATEGORY_CUTOFFS: Record<Category, CategoryCutoffConfig> = {
  GEN: { cutoff: 90, slope: 6 },
  OBC: { cutoff: 82, slope: 6 },
  SC:  { cutoff: 70, slope: 5 },
  ST:  { cutoff: 65, slope: 5 },
  EWS: { cutoff: 80, slope: 6 },
};
