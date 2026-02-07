import { AdmissionProbabilityInput } from "../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../admission-probability.service";
import { ProbabilityConfidenceBand } from "./confidence.types";

export function calculateConfidenceBand(
  input: AdmissionProbabilityInput,
  service: AdmissionProbabilityService
): ProbabilityConfidenceBand {

  const base = service.calculate(input).probability;

  const pessimistic = service.calculate({
    ...input,
    examScore: input.examScore - 5,
    academics: input.academics - 3,
  }).probability;

  const optimistic = service.calculate({
    ...input,
    examScore: input.examScore + 5,
    academics: input.academics + 3,
  }).probability;

  const low = Math.max(0, Math.min(base, pessimistic));
  const high = Math.min(100, Math.max(base, optimistic));

  const spread = high - low;

  const riskLevel =
    spread <= 6 ? "LOW" :
    spread <= 12 ? "MEDIUM" :
    "HIGH";

  return {
    base,
    low,
    high,
    riskLevel,
  };
}
