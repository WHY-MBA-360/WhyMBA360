import { Category } from "../../dto/v1/admission-probability.input";

export const CATEGORY_STEEPNESS_FACTOR: Record<Category, number> = {
  GEN: 1.0,
  OBC: 0.95,
  SC: 0.90,
  ST: 0.85,
};
