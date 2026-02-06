import { NormalizeScoreInput } from "./dto/normalize-score.input";
import { NormalizeScoreOutput } from "./dto/normalize-score.output";

export class ScoreNormalizerService {
  normalize(input: NormalizeScoreInput): NormalizeScoreOutput {
    const { exam, rawScore } = input;

    let normalizedScore = 0;

    switch (exam) {
      case "CAT":
        normalizedScore = rawScore / 3;
        break;
      case "NMAT":
        normalizedScore = rawScore / 4;
        break;
      case "XAT":
        normalizedScore = rawScore / 2;
        break;
    }

    normalizedScore = Math.min(100, Math.max(0, normalizedScore));

    return {
      normalizedScore: Math.round(normalizedScore),
      percentileBand: this.toPercentileBand(normalizedScore),
    };
  }

  private toPercentileBand(score: number): string {
    if (score >= 95) return "95–100";
    if (score >= 90) return "90–95";
    if (score >= 80) return "80–90";
    if (score >= 70) return "70–80";
    return "<70";
  }
}
