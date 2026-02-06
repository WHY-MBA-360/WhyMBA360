import { AdmissionProbabilityInput } from "../dto/admission-probability.input";
import { InstituteExplainability } from "./institute-explainability.output";
import { AdmissionProbabilityService } from "../admission-probability.service";

export function explainInstitute(
  input: AdmissionProbabilityInput,
  service: AdmissionProbabilityService
): InstituteExplainability {

  const base = service.calculate(input);

  return {
    institute: input.institute,
    probability: base.probability,
    drivers: [
      { factor: "EXAM_SCORE", impact: base.breakdown.exam },
      { factor: "ACADEMICS", impact: base.breakdown.academics },
      { factor: "WORK_EX", impact: base.breakdown.workEx },
      { factor: "STREAM", impact: base.breakdown.stream },
      { factor: "DEGREE_TIER", impact: base.breakdown.degreeTier },
      { factor: "CATEGORY", impact: base.breakdown.category },
    ].filter(d => d.impact !== 0),
  };
}
