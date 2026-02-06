import { ExplainContribution } from "../explain.types";
import { CategoryDelta } from "./category-delta.types";

export function categoryDeltaToExplain(
  delta: CategoryDelta
): ExplainContribution {
  return {
    factor: "CATEGORY",
    impact: delta.delta,
  };
}
