import { Institute } from "./institute.constants";
import { INSTITUTE_CUTOFFS } from "./institute-cutoff.config";
import { sigmoid } from "../cutoff/sigmoid";

export function applyInstituteCutoff(
  score: number,
  institute: Institute
): number {
  const cfg = INSTITUTE_CUTOFFS[institute];
  const normalized = (score - cfg.cutoff) / cfg.slope;
  return sigmoid(normalized);
}
