import { InstituteCode } from "./dto/admission-probability.input";

/**
 * Returns dynamic weights for academics vs work-ex
 * based on institute philosophy and candidate profile
 */
export function getAcademicWorkExWeights(
  institute: InstituteCode,
  workExMonths: number
): { academics: number; workEx: number } {
  const years = workExMonths / 12;

  switch (institute) {
    case "IIM_A":
      return {
        academics: clamp(0.65 - years * 0.05, 0.45, 0.65),
        workEx: clamp(0.25 + years * 0.04, 0.15, 0.35),
      };

    case "IIM_B":
      return {
        academics: clamp(0.45 - years * 0.04, 0.25, 0.45),
        workEx: clamp(0.40 + years * 0.05, 0.40, 0.60),
      };

    case "IIM_C":
      return {
        academics: 0.45,
        workEx: 0.35,
      };

    default:
      return {
        academics: 0.5,
        workEx: 0.3,
      };
  }
}

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(max, Math.max(min, value));
}
