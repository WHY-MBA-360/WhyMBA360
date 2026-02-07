import { AdmissionProbabilityInput } from "../../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../../admission-probability.service";
import { ProbabilityConfidenceBand } from "../confidence.types";
import { INSTITUTE_SENSITIVITY } from "./institute-sensitivity";

export function calculateInstituteConfidence(
  institute: keyof typeof INSTITUTE_SENSITIVITY,
  input: AdmissionProbabilityInput,
  service: AdmissionProbabilityService
): ProbabilityConfidenceBand {

  const { score, academics } = INSTITUTE_SENSITIVITY[institute];

  const base = service.calculate({ ...input, institute }).probability;

  const low = service.calculate({
    ...input,
    institute,
    examScore: input.examScore - score,
    academics: input.academics - academics,
  }).probability;

  const high = service.calculate({
    ...input,
    institute,
    examScore: input.examScore + score,
    academics: input.academics + academics,
  }).probability;

  const spread = high - low;

  const riskLevel =
    spread <= 6 ? "LOW" :
    spread <= 12 ? "MEDIUM" :
    "HIGH";

  return {
    base,
    low: Math.max(0, low),
    high: Math.min(100, high),
    riskLevel,
  };
}
