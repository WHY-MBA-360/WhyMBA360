export interface AdmissionProbabilityOutput {
  probability: number; // 0–1
  confidenceBand: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
}
