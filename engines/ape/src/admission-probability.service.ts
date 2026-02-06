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
import { INSTITUTE_TRADEOFF_WEIGHTS } from "./tradeoff";
import { STREAM_BIAS } from "./stream";
import { DEGREE_TIER_BIAS } from "./degree";
import { ACADEMIC_TREND_BIAS } from "./trend";

export class AdmissionProbabilityService {

  calculate(input: AdmissionProbabilityInputV1): AdmissionProbabilityOutputV1 {
    const probability = this.computeProbability(input);

    return {
      institute: input.institute,
      probability,
      breakdown: {
        academics: probability * 0.6,
        workEx: probability * 0.4,
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

  private computeProbability(input: AdmissionProbabilityInputV1): number {
    const curve = INSTITUTE_CURVES[input.institute];
    const tradeoff = INSTITUTE_TRADEOFF_WEIGHTS[input.institute];

    const cutoff =
      curve.cutoff + CATEGORY_CUTOFF_SHIFT[input.category];

    const steepness =
      curve.steepness * CATEGORY_STEEPNESS_FACTOR[input.category];

    const academicScore = input.normalizedScore;
    const workExScore = Math.min(input.workExMonths, 36) * 1.2;

    const blendedScore =
      academicScore * tradeoff.academics +
      workExScore * tradeoff.workEx;

    const streamBias =
      STREAM_BIAS[input.institute][input.stream];

    const degreeBias =
      DEGREE_TIER_BIAS[input.degreeTier];

    const trendBias =
      ACADEMIC_TREND_BIAS[input.academicTrend];

    const adjustedScore =
      blendedScore + streamBias + degreeBias + trendBias;

    const x = adjustedScore - cutoff;
    const probability = 100 / (1 + Math.exp(-steepness * x));

    return Math.round(Math.max(0, Math.min(100, probability)));
  }
}
