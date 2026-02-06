export interface AdmissionProbabilityOutput {
  admitProbability: number; // 0–1
  band: "Safe" | "Target" | "Stretch";
}
