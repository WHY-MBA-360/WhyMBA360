export type CounterfactualAction =
  | "INCREASE_SCORE"
  | "ADD_WORK_EX"
  | "IMPROVE_ACADEMICS"
  | "CHANGE_TARGET_INSTITUTE";

export interface CounterfactualResult {
  action: CounterfactualAction;
  deltaProbability: number;
  effortLevel: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
}
