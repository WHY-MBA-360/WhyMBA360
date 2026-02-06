import { AcademicProfile, InstituteCode } from "./dto/admission-probability.input";
import { DEGREE_TIER_MULTIPLIER } from "./degree-tiers";
import { academicTrendMultiplier } from "./academic-trend";
import { INSTITUTE_ACADEMIC_BIAS } from "./institute-bias";

export function normalizeAcademics(
  academics: AcademicProfile,
  institute: InstituteCode
): number {
  const baseAverage =
    (academics.class10 +
      academics.class12 +
      academics.graduation) / 3;

  const streamMultiplier =
    academics.stream === "ENGG" ? 1.05 : 1.0;

  const degreeMultiplier =
    DEGREE_TIER_MULTIPLIER[academics.degreeTier];

  const trendMultiplier =
    academicTrendMultiplier(academics);

  const instituteMultiplier =
    INSTITUTE_ACADEMIC_BIAS[institute];

  const adjusted =
    baseAverage *
    streamMultiplier *
    degreeMultiplier *
    trendMultiplier *
    instituteMultiplier;

  return Math.max(0, Math.min(1, adjusted / 100));
}
