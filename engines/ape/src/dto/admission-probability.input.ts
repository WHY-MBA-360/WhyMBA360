export type ExamType = "CAT" | "NMAT" | "XAT";
export type Category = "GEN" | "OBC" | "SC" | "ST";
export type CollegeCode = "IIM_A" | "IIM_B" | "IIM_C";

export interface AdmissionProbabilityInput {
  exam: ExamType;
  rawScore: number;
  category: Category;
  college: CollegeCode;
}
