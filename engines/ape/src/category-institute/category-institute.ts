import { Institute } from "../institute";
import { Category } from "../category";
import { CATEGORY_INSTITUTE_MULTIPLIERS } from "./category-institute.config";

export function applyCategoryInstituteInteraction(
  baseProbability: number,
  institute: Institute,
  category: Category
): number {
  const key = `${institute}_${category}` as const;
  const multiplier = CATEGORY_INSTITUTE_MULTIPLIERS[key]?.multiplier ?? 1;

  const adjusted = baseProbability * multiplier;
  return Math.max(0, Math.min(1, adjusted));
}
