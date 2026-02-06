export interface CounterfactualSuggestion {
  factor: string;
  change: string;
  impact: number; // probability delta
}
