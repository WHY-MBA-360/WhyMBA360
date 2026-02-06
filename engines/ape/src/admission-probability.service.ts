import { AdmissionProbabilityInput, AdmissionProbabilityOutput } from "./dto";

export class AdmissionProbabilityService {
  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {
    const score = Math.max(0, Math.min(100, input.normalizedScore));

    let admitProbability = 0.1;
    if (score >= 90) admitProbability = 0.8;
    else if (score >= 75) admitProbability = 0.55;
    else if (score >= 60) admitProbability = 0.35;

    const band =
      admitProbability >= 0.7 ? "Safe" :
      admitProbability >= 0.4 ? "Target" :
      "Stretch";

    return { admitProbability, band };
  }
}
