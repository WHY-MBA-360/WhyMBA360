import { ExplainContribution } from "./explain.types";

export interface InstituteExplainability {
  institute: "IIM_A" | "IIM_B" | "IIM_C";
  probability: number;
  drivers: ExplainContribution[];
}
