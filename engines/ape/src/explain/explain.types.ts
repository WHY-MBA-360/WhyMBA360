export type ExplainFactor =
  | "EXAM_SCORE"
  | "ACADEMICS"
  | "WORK_EX"
  | "STREAM"
  | "DEGREE_TIER"
  | "CATEGORY";

export interface ExplainContribution {
  factor: ExplainFactor;
  impact: number; // positive or negative points
}
