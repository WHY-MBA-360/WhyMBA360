import {
  InstituteCategorySeats,
  CategorySeatAdjustedScore,
  Category,
} from "./category-seat.types";

export function applyCategorySeatNormalization(
  institute: InstituteCategorySeats,
  baseProbability: number,
  category: Category
): CategorySeatAdjustedScore {

  const seatsForCategory = institute.categorySeats[category];

  if (!seatsForCategory || institute.totalSeats === 0) {
    return {
      institute: institute.institute,
      category,
      baseProbability,
      categoryAdjustedProbability: 0,
    };
  }

  return {
    institute: institute.institute,
    category,
    baseProbability,
    categoryAdjustedProbability:
      baseProbability * (seatsForCategory / institute.totalSeats),
  };
}
