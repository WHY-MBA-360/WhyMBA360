import { ExamType } from "../constants/college-cutoffs";

export interface AdmissionProbabilityInput {
  collegeCode: "IIM_A" | "IIM_B" | "IIM_C";
  exam: ExamType;
  normalizedScore: number; // 0–100 from CIE
}
