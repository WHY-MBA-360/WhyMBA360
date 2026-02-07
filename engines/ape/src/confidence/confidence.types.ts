export interface ProbabilityConfidenceBand {
  base: number;
  low: number;
  high: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}
