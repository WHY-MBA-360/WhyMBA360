import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { buildExplanation } from "./explain";

@Injectable()
export class AdmissionProbabilityService {
  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {

    // --- Core normalized signals (already computed elsewhere / v1 constants) ---
    const academicScore = input.score;       // 0–100 normalized
    const workExScore = input.workExMonths ?? 0;

    // --- Deterministic biases (v1 placeholders, calibrated later) ---
    const streamBias = input.stream === "ENGINEER" ? -3 : 2;
    const degreeBias =
      input.degreeTier === "IIT" ? 6 :
      input.degreeTier === "NIT" ? 4 :
      1;

    const trendBias =
      input.academicTrend === "UP" ? 4 :
      input.academicTrend === "DOWN" ? -4 :
      0;

    // --- Tradeoff weights (v1 fixed) ---
    const academicsWeight = 0.65;
    const workExWeight = 0.35;

    // --- Factor contributions (THIS is the explainability source of truth) ---
    const factorContributions = {
      score: academicScore * academicsWeight,
      workEx: workExScore * workExWeight,
      stream: streamBias,
      degree: degreeBias,
      trend: trendBias,
    };

    // --- Final probability ---
    const rawProbability =
      factorContributions.score +
      factorContributions.workEx +
      factorContributions.stream +
      factorContributions.degree +
      factorContributions.trend;

    const probability = Math.max(0, Math.min(100, Math.round(rawProbability)));

    // --- Explanation ---
    const explanation = buildExplanation(probability, factorContributions);

    return {
      institute: input.institute,
      probability,
      explanation,
    };
  }
}
