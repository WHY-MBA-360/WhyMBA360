import { Category } from "../category/category.constants";
import { CATEGORY_CUTOFFS } from "./category-cutoff.config";
import { sigmoid } from "./sigmoid";

export function applyCategoryCutoff(
  score: number,
  category: Category
): number {
  const cfg = CATEGORY_CUTOFFS[category];
  const normalized = (score - cfg.cutoff) / cfg.slope;
  return sigmoid(normalized);
}
