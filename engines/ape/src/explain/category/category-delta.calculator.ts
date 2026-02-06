import { AdmissionProbabilityInput } from "../../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../../admission-probability.service";
import { CategoryDelta } from "./category-delta.types";

export function computeCategoryDelta(
  input: AdmissionProbabilityInput,
  service: AdmissionProbabilityService
): CategoryDelta {

  if (input.category === "GEN") {
    return { category: "GEN", delta: 0 };
  }

  const genScore = service.calculate({
    ...input,
    category: "GEN",
  }).probability;

  const actualScore = service.calculate(input).probability;

  return {
    category: input.category,
    delta: Math.round(actualScore - genScore),
  };
}
