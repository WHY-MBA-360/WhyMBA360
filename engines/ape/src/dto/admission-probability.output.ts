export interface AdmissionProbabilityOutput {
  probability: number;
  confidenceBand: "LOW" | "MEDIUM" | "HIGH";
  explanation: string[];
}
