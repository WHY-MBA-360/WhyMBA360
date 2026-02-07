export type Category = "GEN" | "OBC" | "SC" | "ST";

export interface InstituteCategorySeats {
  institute: string;
  totalSeats: number;
  categorySeats: Record<Category, number>;
}

export interface CategorySeatAdjustedScore {
  institute: string;
  category: Category;
  baseProbability: number;
  categoryAdjustedProbability: number;
}
