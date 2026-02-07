import { Category } from "./category.constants";

export interface CategorySeatROI {
  institute: string;
  category: Category;
  probability: number;
  effectiveSeats: number;
  totalCost: number;
  weightedRoi: number;
}
