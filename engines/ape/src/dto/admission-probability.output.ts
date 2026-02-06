export interface AdmissionProbabilityOutput {
  probability: number; // 0–1
  meetsCutoff: boolean;

  breakdown: {
    score: number;
    academics: number;
    workEx: number;
  };
}
