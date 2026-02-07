import { Institute } from "../institute";
import { Category } from "../category";
import { ProbabilityComparisonExplanation } from "./explainability.types";
import { CATEGORY_MULTIPLIERS } from "../category/category.config";
import { INSTITUTE_MULTIPLIERS } from "../institute/institute.config";
import { CATEGORY_INSTITUTE_MULTIPLIERS } from "../category-institute/category-institute.config";

export function explainProbabilityComparison(
  instituteA: Institute,
  categoryA: Category,
  probA: number,
  instituteB: Institute,
  categoryB: Category,
  probB: number
): ProbabilityComparisonExplanation {
  const instituteDelta =
    INSTITUTE_MULTIPLIERS[instituteB] -
    INSTITUTE_MULTIPLIERS[instituteA];

  const categoryDelta =
    CATEGORY_MULTIPLIERS[categoryB] -
    CATEGORY_MULTIPLIERS[categoryA];

  const interactionDelta =
    (CATEGORY_INSTITUTE_MULTIPLIERS[`${instituteB}_${categoryB}`]?.multiplier ?? 1) -
    (CATEGORY_INSTITUTE_MULTIPLIERS[`${instituteA}_${categoryA}`]?.multiplier ?? 1);

  const components = [
    {
      label: "Institute Effect",
      delta: instituteDelta,
      reason: `${instituteB} historically has different selectivity than ${instituteA}`,
    },
    {
      label: "Category Effect",
      delta: categoryDelta,
      reason: `${categoryB} receives different cutoff treatment than ${categoryA}`,
    },
    {
      label: "Category × Institute Interaction",
      delta: interactionDelta,
      reason: `${categoryB} at ${instituteB} is treated differently than ${categoryA} at ${instituteA}`,
    },
  ];

  return {
    baseA: probA,
    baseB: probB,
    finalDelta: probB - probA,
    components,
    conclusion:
      probB > probA
        ? `${categoryB}@${instituteB} outranks ${categoryA}@${instituteA} due to structural advantages`
        : `${categoryA}@${instituteA} remains stronger after adjustments`,
  };
}
