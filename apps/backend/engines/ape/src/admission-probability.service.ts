import {
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "./dto";
import {
  SCORE_WEIGHT,
  PROFILE_WEIGHT,
  CATEGORY_WEIGHT,
  CATEGORY_ADJUSTMENT,
  CONFIDENCE_BANDS,
} from "./admission-probability.constants";

export class AdmissionProbabilityService {
  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    const scoreComponent = this.scoreFactor(input.normalizedScore);
    const profileComponent = this.profileFactor(
      input.workExperienceMonths,
      input.undergraduateGPA
    );
    const categoryComponent =
      CATEGORY_ADJUSTMENT[input.category] ?? 0;

    const probability =
      scoreComponent * SCORE_WEIGHT +
      profileComponent * PROFILE_WEIGHT +
      categoryComponent * CATEGORY_WEIGHT;

    const boundedProbability = Math.min(
      1,
      Math.max(0, probability)
    );

    return {
      probability: Number(boundedProbability.toFixed(2)),
      confidenceBand: this.toConfidenceBand(boundedProbability),
      explanation: {
        scoreWeight: scoreComponent,
        profileWeight: profileComponent,
        categoryAdjustment: categoryComponent,
      },
    };
  }

  private scoreFactor(score: number): number {
    return Math.min(1, Math.max(0, score / 100));
  }

  private profileFactor(workExpMonths: number, gpa: number): number {
    const expScore = Math.min(1, workExpMonths / 36);
    const gpaScore = Math.min(1, gpa / 10);
    return expScore * 0.6 + gpaScore * 0.4;
  }

  private toConfidenceBand(
    probability: number
  ): AdmissionProbabilityOutput["confidenceBand"] {
    return (
      CONFIDENCE_BANDS.find(b => probability >= b.min)?.label ??
      "VERY_LOW"
    );
  }
}
