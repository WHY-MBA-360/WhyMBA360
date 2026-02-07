export interface InstituteProbability {
  institute: string;
  probability: number; // 0–1
}

export interface ProbabilityVector {
  results: InstituteProbability[];
}
