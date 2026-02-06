import { AdmissionProbabilityInput } from "../../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../../admission-probability.service";
import { InstituteConfidenceMap } from "./institute-confidence.types";
import { calculateInstituteConfidence } from "./institute-confidence.calc";

export function calculateInstituteConfidenceVector(
  input: AdmissionProbabilityInput,
  service: AdmissionProbabilityService
): InstituteConfidenceMap {

  return {
    IIM_A: calculateInstituteConfidence("IIM_A", input, service),
    IIM_B: calculateInstituteConfidence("IIM_B", input, service),
    IIM_C: calculateInstituteConfidence("IIM_C", input, service),
  };
}
