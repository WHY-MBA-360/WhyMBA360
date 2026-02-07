import { CategoryInstituteKey, CategoryInstituteMultiplier } from "./category-institute.types";

export const CATEGORY_INSTITUTE_MULTIPLIERS: Record<
  CategoryInstituteKey,
  CategoryInstituteMultiplier
> = {
  // IIM A
  IIM_A_GEN: { multiplier: 0.90 },
  IIM_A_OBC: { multiplier: 1.00 },
  IIM_A_SC:  { multiplier: 1.15 },
  IIM_A_ST:  { multiplier: 1.20 },

  // IIM B
  IIM_B_GEN: { multiplier: 0.95 },
  IIM_B_OBC: { multiplier: 1.05 },
  IIM_B_SC:  { multiplier: 1.20 },
  IIM_B_ST:  { multiplier: 1.25 },

  // IIM C
  IIM_C_GEN: { multiplier: 1.00 },
  IIM_C_OBC: { multiplier: 1.10 },
  IIM_C_SC:  { multiplier: 1.25 },
  IIM_C_ST:  { multiplier: 1.30 },
};
