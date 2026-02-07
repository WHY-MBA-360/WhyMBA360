export type InstituteCode = "IIM_A" | "IIM_B" | "IIM_C";

export interface InstituteCalibration {
  academicsWeight: number;
  workExWeight: number;
  streamBias: number;
  degreeBias: number;
  trendBias: number;
}
