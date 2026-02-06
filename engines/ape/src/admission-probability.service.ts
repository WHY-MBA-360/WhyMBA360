import { COLLEGE_CUTOFFS } from "./constants/college-cutoffs";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";

export class AdmissionProbabilityService {
  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {
    const { collegeCode, exam, normalizedScore } = input;

    const cutoff = COLLEGE_CUTOFFS[collegeCode]?.[exam];

    if (!cutoff) {
      return {
        probability: 0,
        confidenceBand: "LOW",
        explanation: `${exam} is not accepted by ${collegeCode}.`,
      };
    }

    const D = normalizedScore - cutoff;
    const k = 0.8;

    let probability = 1 / (1 + Math.exp(-k * D));
    probability = Math.min(0.98, Math.max(0.02, probability));

    const confidenceBand =
      probability < 0.25 ? "LOW" :
      probability < 0.6 ? "MEDIUM" : "HIGH";

    const explanation =
      D < 0
        ? `Your ${exam} score is ${Math.abs(D).toFixed(1)} points below the typical cutoff for ${collegeCode}.`
        : `Your ${exam} score exceeds the usual cutoff for ${collegeCode}.`;

    return {
      probability: Number(probability.toFixed(2)),
      confidenceBand,
      explanation,
    };
  }
}
