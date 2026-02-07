export type InstituteCode = "IIM_A" | "IIM_B" | "IIM_C";

/**
 * Academic bias per institute.
 * >1  ? academics valued more
 * <1  ? academics valued less
 */
export const INSTITUTE_ACADEMIC_BIAS: Record<InstituteCode, number> = {
  IIM_A: 1.10,
  IIM_B: 1.00,
  IIM_C: 0.95,
};
