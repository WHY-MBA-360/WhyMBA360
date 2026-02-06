export type ExamType = "CAT" | "NMAT" | "XAT";

export interface AdmissionProbabilityInput {
  exam: ExamType;
  normalizedScore: number;
  category: "GEN" | "OBC" | "SC" | "ST" | "EWS";
  workExperienceMonths: number;
  undergraduateGPA: number;
  targetCollegeCode: string;
}
