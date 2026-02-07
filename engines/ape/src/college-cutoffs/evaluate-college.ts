import { CollegeCode } from "./college-code";
import { COLLEGE_CUTOFFS } from "./college-cutoffs";

export type AdmitVerdict =
  | "REJECT"
  | "LIKELY"
  | "STRONG";

export function evaluateCollege(
  probability: number,
  college: CollegeCode
): AdmitVerdict {
  const cutoff = COLLEGE_CUTOFFS[college];

  if (probability < cutoff.minProbability) return "REJECT";
  if (probability < cutoff.strongBand) return "LIKELY";
  return "STRONG";
}
