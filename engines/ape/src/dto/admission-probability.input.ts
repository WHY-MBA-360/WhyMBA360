export type ExamType = "CAT" | "NMAT" | "XAT";
export type CollegeCode = "IIM_A" | "IIM_B" | "IIM_C";
export type Category = "GEN" | "OBC" | "SC" | "ST";
export type AcademicStream = "ENGG" | "NON_ENGG";

export interface AcademicProfile {
  class10: number;      // 0–100
  class12: number;      // 0–100
  graduation: number;   // 0–100
  stream: AcademicStream;
}

export interface AdmissionProbabilityInput {
  exam: ExamType;
  rawScore: number;
  college: CollegeCode;
  category: Category;
  academics: AcademicProfile;
  workExMonths: number;
}
