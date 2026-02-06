export type ExamType = "CAT" | "NMAT" | "XAT";

export interface AdmissionProbabilityInput {
  exam: ExamType;
  normalizedScore: number; // 0–100
}
