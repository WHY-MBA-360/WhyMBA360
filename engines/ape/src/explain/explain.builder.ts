import { ExplainFactor, ProbabilityExplanation } from "./explain.types";
import { EXPLAIN_LABELS } from "./explain.constants";

export function buildExplanation(
  finalProbability: number,
  rawFactors: Record<string, number>
): ProbabilityExplanation {

  const factors: ExplainFactor[] = Object.entries(rawFactors)
    .filter(([, impact]) => impact !== 0)
    .map(([key, impact]) => ({
      key,
      label: EXPLAIN_LABELS[key] ?? key,
      impact,
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

  const positives = factors.filter(f => f.impact > 0).length;
  const negatives = factors.filter(f => f.impact < 0).length;

  const summary =
    positives > negatives
      ? "Profile strengths outweigh weaknesses."
      : positives === negatives
      ? "Profile is balanced with trade-offs."
      : "Profile weaknesses outweigh strengths.";

  return {
    finalProbability,
    factors,
    summary,
  };
}
