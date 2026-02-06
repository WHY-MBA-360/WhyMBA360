export const SCORE_WEIGHT = 0.6;
export const PROFILE_WEIGHT = 0.3;
export const CATEGORY_WEIGHT = 0.1;

export const CATEGORY_ADJUSTMENT: Record<string, number> = {
  GEN: 0.0,
  OBC: 0.05,
  EWS: 0.05,
  SC: 0.1,
  ST: 0.1,
};

export const CONFIDENCE_BANDS = [
  { min: 0.8, label: "VERY_HIGH" },
  { min: 0.65, label: "HIGH" },
  { min: 0.45, label: "MEDIUM" },
  { min: 0.25, label: "LOW" },
  { min: 0.0, label: "VERY_LOW" },
] as const;
