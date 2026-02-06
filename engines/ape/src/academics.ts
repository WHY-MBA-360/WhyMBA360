import { AcademicProfile } from "./dto/admission-probability.input";

export function normalizeAcademics(
  academics: AcademicProfile
): number {
  const raw =
    (academics.class10 +
      academics.class12 +
      academics.graduation) / 3;

  // Stream-aware adjustment
  // ENGG: tougher grading ? slight uplift
  // NON_ENGG: baseline
  const streamMultiplier =
    academics.stream === "ENGG" ? 1.05 : 1.0;

  const adjusted = raw * streamMultiplier;

  // Normalize to 0–1
  return Math.max(0, Math.min(1, adjusted / 100));
}
