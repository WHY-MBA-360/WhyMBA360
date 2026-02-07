import { Category } from "../../dto/v1/admission-probability.input";

export const CATEGORY_CUTOFF_SHIFT: Record<Category, number> = {
  GEN: 0,
  OBC: -4,
  SC: -7,
  ST: -9,
};
