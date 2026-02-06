import { Category, CollegeCode } from "./dto/admission-probability.input";

export const CATEGORY_CUTOFFS: Record<
  CollegeCode,
  Record<Category, number>
> = {
  IIM_A: {
    GEN: 98,
    OBC: 95,
    SC: 90,
    ST: 88,
  },
  IIM_B: {
    GEN: 97,
    OBC: 94,
    SC: 89,
    ST: 87,
  },
  IIM_C: {
    GEN: 96,
    OBC: 93,
    SC: 88,
    ST: 86,
  },
};
