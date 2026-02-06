export interface AdmissionProbabilityOutput {
  probability: number; // 0.0 – 1.0
  meetsCutoff: boolean;
}
