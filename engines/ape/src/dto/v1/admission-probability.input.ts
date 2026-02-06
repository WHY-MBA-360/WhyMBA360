export type ExamType = "CAT" | "NMAT" | "XAT";
export type Category = "GEN" | "OBC" | "SC" | "ST";
export type Institute = "IIM_A" | "IIM_B" | "IIM_C";
export type Stream = "ENG" | "NON_ENG";
export type DegreeTier = "IIT" | "NIT" | "TIER1" | "TIER2" | "TIER3";
export type Trend = "IMPROVING" | "STABLE" | "DECLINING";

/**
 * APE v1 — Admission Probability Input
 * ?? IMMUTABLE CONTRACT
 */
export interface AdmissionProbabilityInputV1 {
  exam: ExamType;
  institute: Institute;
  category: Category;

  normalizedScore: number; // 0–100

  academics: {
    class10: number; // %
    class12: number; // %
    grad: number; // %
    stream: Stream;
    degreeTier: DegreeTier;
    trend: Trend;
  };

  workExMonths: number;
}
