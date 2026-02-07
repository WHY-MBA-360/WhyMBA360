import { AdmissionProbabilityInput } from "../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../admission-probability.service";
import { InstituteExplainability } from "./institute-explainability.output";
import { explainInstitute } from "./explain-institute.calculator";

export function explainAllInstitutes(
  baseInput: Omit<AdmissionProbabilityInput, "institute">,
  service: AdmissionProbabilityService
): InstituteExplainability[] {

  const institutes = ["IIM_A", "IIM_B", "IIM_C"] as const;

  return institutes.map((institute) =>
    explainInstitute(
      { ...baseInput, institute },
      service
    )
  );
}
