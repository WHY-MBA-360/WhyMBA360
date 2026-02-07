import { AcademicProfile } from "./dto/admission-probability.input";

/**
 * Computes academic trend multiplier based on slope:
 * 10th ? 12th ? Graduation
 */
export function academicTrendMultiplier(
  academics: AcademicProfile
): number {
  const { class10, class12, graduation } = academics;

  // Simple slope: last - first
  const slope = graduation - class10;

  // Normalize slope to [-1, +1] range (max 30-point swing)
  const normalizedSlope = Math.max(-1, Math.min(1, slope / 30));

  // Map to multiplier band
  // +ve trend ? up to +5%
  // -ve trend ? down to -5%
  return 1 + normalizedSlope * 0.05;
}
