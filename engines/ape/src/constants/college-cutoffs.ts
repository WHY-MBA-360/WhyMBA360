export type ExamType = "CAT" | "NMAT" | "XAT";

export const COLLEGE_CUTOFFS: Record<string, Partial<Record<ExamType, number>>> = {
  IIM_A: { CAT: 99.6, XAT: 99.4 },
  IIM_B: { CAT: 99.4, XAT: 99.2 },
  IIM_C: { CAT: 99.5, XAT: 99.3 },
};
