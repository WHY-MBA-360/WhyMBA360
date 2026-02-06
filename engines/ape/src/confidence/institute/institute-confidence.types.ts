import { ProbabilityConfidenceBand } from "../confidence.types";

export type InstituteCode = "IIM_A" | "IIM_B" | "IIM_C";

export type InstituteConfidenceMap = {
  [key in InstituteCode]: ProbabilityConfidenceBand;
};
