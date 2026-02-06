import {
  AdmissionProbabilityInputV1,
  AdmissionProbabilityOutputV1,
  Institute,
} from "./dto/v1";
import { AdmissionProbabilityVectorV1 } from "./vector";
import { INSTITUTE_CURVES } from "./curves";
import {
  CATEGORY_CUTOFF_SHIFT,
  CATEGORY_STEEPNESS_FACTOR,
} from "./curves/category";

export class AdmissionProbabilityService {

  calculate(input: AdmissionProbabilityInputV1): AdmissionProbabilityOutputV1 {
    const probability = this.computeProbability(input);

    return {
      institute: input.institute,
      probability,
      breakdown: {
        score: probability * 0.6,
        academics: probability * 0.25,
        workEx: probability * 0.15,
      },
    };
  }

  calculateVector(
    input: AdmissionProbabilityInputV1
  ): AdmissionProbabilityVectorV1 {
    const institutes: Institute[] = ["IIM_A", "IIM_B", "IIM_C"];

    const probabilities = institutes.reduce((acc, institute) => {
      acc[institute] = this.computeProbability({ ...input, institute });
      return acc;
    }, {} as Record<Institute, number>);

    return { probabilities };
  }

  /**
   * ?? Category-aware non-linear probability
   */
  private computeProbability(input: AdmissionProbabilityInputV1): number {
    const baseCurve = INSTITUTE_CURVES[input.institute];

    const cutoff =
      baseCurve.cutoff + CATEGORY_CUTOFF_SHIFT[input.category];

    const steepness =
      baseCurve.steepness * CATEGORY_STEEPNESS_FACTOR[input.category];

    let score = input.normalizedScore;

    // Work-ex contribution (cap)
    score += Math.min(input.workExMonths, 36) * 0.15;

    const x = score - cutoff;
    const probability = 100 / (1 + Math.exp(-steepness * x));

    return Math.round(Math.max(0, Math.min(100, probability)));
  }
}
