export interface RankedInstitute {
  institute: "IIM_A" | "IIM_B" | "IIM_C";
  baseProbability: number;
  confidenceSpread: number;
  weightedScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

export interface ConfidenceWeightedRanking {
  ranking: RankedInstitute[];
  recommendedInstitute: "IIM_A" | "IIM_B" | "IIM_C";
}
