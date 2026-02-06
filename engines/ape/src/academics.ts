import { AcademicProfile } from "./dto/admission-probability.input";
import { DEGREE_TIER_MULTIPLIER } from "./degree-tiers";
import { academicTrendMultiplier } from "./academic-trend";

export function normalizeAcademics(
  academics: AcademicProfile
): number {
  const baseAverage =
    (academics.class10 +
      academics.class12 +
      academics.graduation) / 3;

  // Stream adjustment
  const streamMultiplier =
    academics.stream === "ENGG" ? 1.05 : 1.0;

  // Degree tier adjustment
  const degreeMultiplier =
    DEGREE_TIER_MULTIPLIER[academics.degreeTier];

  // Trend adjustment
  const trendMultiplier =
    academicTrendMultiplier(academics);

  const adjusted =
    baseAverage *
    streamMultiplier *
    degreeMultiplier *
    trendMultiplier;

  // Normalize to 0–1
  return Math.max(0, Math.min(1, adjusted / 100));
}
