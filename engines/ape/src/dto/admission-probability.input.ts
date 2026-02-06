export type ExamType = "CAT" | "NMAT" | "XAT";
export type Category = "GEN" | "OBC" | "SC" | "ST";
export type Stream = "ENGG" | "NON_ENGG";
export type DegreeTier = "IIT" | "NIT" | "PRIVATE";
export type InstituteCode = "IIM_A" | "IIM_B" | "IIM_C";

export interface AcademicProfile {
  class10: number;
  class12: number;
  graduation: number;
  stream: Stream;
  degreeTier: DegreeTier;
}

export interface AdmissionProbabilityInput {
  exam: ExamType;
  score: number;
  category: Category;
  institute: InstituteCode;
  academics: AcademicProfile;
  workExMonths: number;
}
