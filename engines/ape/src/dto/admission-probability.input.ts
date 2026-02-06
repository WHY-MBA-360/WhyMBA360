export type ExamType = "CAT" | "NMAT" | "XAT";

export interface AdmissionProbabilityInput {
  exam: ExamType;
  normalizedScore: number;
  academicsScore: number;
  workExperienceMonths: number;
  diversityBoost?: boolean;
}
