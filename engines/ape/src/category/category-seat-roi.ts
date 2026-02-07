import { CATEGORY_SEAT_SHARE, Category } from "./category.constants";
import { InstituteSeatMeta } from "../seat/seat.types";
import { InstituteProbability } from "../portfolio/portfolio.types";
import { InstituteCost } from "../budget/budget.types";
import { CategorySeatROI } from "./category-seat-roi.types";

export function computeCategorySeatROI(
  probabilities: InstituteProbability[],
  costs: InstituteCost[],
  seats: InstituteSeatMeta[],
  category: Category
): CategorySeatROI[] {

  const costMap = new Map(
    costs.map(c => [c.institute, c.formFee + c.travelCost])
  );

  const seatMap = new Map(
    seats.map(s => [s.institute, s.seatCount])
  );

  const categoryShare = CATEGORY_SEAT_SHARE[category];

  return probabilities.map(p => {
    const totalCost = costMap.get(p.institute) ?? Infinity;
    const totalSeats = seatMap.get(p.institute) ?? 1;
    const effectiveSeats = totalSeats * categoryShare;

    return {
      institute: p.institute,
      category,
      probability: p.probability,
      effectiveSeats,
      totalCost,
      weightedRoi: (p.probability * effectiveSeats) / totalCost,
    };
  }).sort((a, b) => b.weightedRoi - a.weightedRoi);
}
