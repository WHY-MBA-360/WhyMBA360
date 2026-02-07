import { AcademicTrend } from "./trend.types";

export const ACADEMIC_TREND_BIAS: Record<AcademicTrend, number> = {
  STRONG_UP: +4,
  UP: +2,
  FLAT: 0,
  DOWN: -2,
  STRONG_DOWN: -4,
};
