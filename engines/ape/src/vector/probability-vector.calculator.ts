import { AdmissionProbabilityInput } from "../dto/admission-probability.input";
import { ProbabilityVectorOutput } from "./probability-vector.output";
import { AdmissionProbabilityService } from "../admission-probability.service";

export function calculateProbabilityVector(
  baseInput: Omit<AdmissionProbabilityInput, "institute">,
  service: AdmissionProbabilityService
): ProbabilityVectorOutput {

  const institutes = ["IIM_A", "IIM_B", "IIM_C"] as const;

  return {
    results: institutes.map((institute) => {
      const result = service.calculate({
        ...baseInput,
        institute,
      });

      return {
        institute,
        probability: result.probability,
      };
    }),
  };
}
