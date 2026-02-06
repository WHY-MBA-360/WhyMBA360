export interface ExplainFactor {
  key: string;
  label: string;
  impact: number;
}

export interface ProbabilityExplanation {
  finalProbability: number;
  factors: ExplainFactor[];
  summary: string;
}
