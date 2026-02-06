import {
  AdmissionProbabilityInputV1,
  AdmissionProbabilityOutputV1,
  Institute,
} from "./dto/v1";
import { AdmissionProbabilityVectorV1 } from "./vector";

export class AdmissionProbabilityService {
  calculate(input: AdmissionProbabilityInputV1): AdmissionProbabilityOutputV1 {
    const base = this.baseScore(input);

    return {
      institute: input.institute,
      probability: base,
      breakdown: {
        score: base * 0.6,
        academics: base * 0.25,
        workEx: base * 0.15,
      },
    };
  }

  /**
   * ?? NEW — Multi-Institute Vector
   */
  calculateVector(
    input: AdmissionProbabilityInputV1
  ): AdmissionProbabilityVectorV1 {
    const institutes: Institute[] = ["IIM_A", "IIM_B", "IIM_C"];

    const probabilities = institutes.reduce((acc, institute) => {
      acc[institute] = this.baseScore({ ...input, institute });
      return acc;
    }, {} as Record<Institute, number>);

    return { probabilities };
  }

  /**
   * Deterministic base probability
   */
  private baseScore(input: AdmissionProbabilityInputV1): number {
    let score = input.normalizedScore;

    // Institute strictness
    if (input.institute === "IIM_A") score -= 5;
    if (input.institute === "IIM_C") score += 3;

    // Category relaxation
    if (input.category !== "GEN") score += 4;

    // Work-ex bonus (cap 36 months)
    score += Math.min(input.workExMonths, 36) * 0.15;

    return Math.max(0, Math.min(100, Math.round(score)));
  }
}
