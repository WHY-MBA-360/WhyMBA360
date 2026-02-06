export interface CounterfactualOption {
  factor: string;          // e.g. "CAT score", "Work Experience"
  currentValue: number;
  targetValue: number;
  deltaProbability: number;
  effortScore: number;     // normalized cost (lower = easier)
  roi: number;             // deltaProbability / effortScore
}

export interface CounterfactualResult {
  baselineProbability: number;
  bestMove: CounterfactualOption;
  rankedOptions: CounterfactualOption[];
}
