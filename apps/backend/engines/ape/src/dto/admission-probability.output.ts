export interface AdmissionProbabilityOutput {
  probability: number;
  confidenceBand: "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  explanation: {
    scoreWeight: number;
    profileWeight: number;
    categoryAdjustment: number;
  };
}
