import { InstituteSeatMeta, SeatWeightedROI } from "./seat.types";
import { InstituteProbability } from "../portfolio/portfolio.types";
import { InstituteCost } from "../budget/budget.types";

export function computeSeatWeightedROI(
  probabilities: InstituteProbability[],
  costs: InstituteCost[],
  seats: InstituteSeatMeta[]
): SeatWeightedROI[] {

  const costMap = new Map(
    costs.map(c => [c.institute, c.formFee + c.travelCost])
  );

  const seatMap = new Map(
    seats.map(s => [s.institute, s.seatCount])
  );

  return probabilities.map(p => {
    const totalCost = costMap.get(p.institute) ?? Infinity;
    const seatCount = seatMap.get(p.institute) ?? 1;

    return {
      institute: p.institute,
      probability: p.probability,
      seatCount,
      totalCost,
      weightedRoi: (p.probability * seatCount) / totalCost,
    };
  }).sort((a, b) => b.weightedRoi - a.weightedRoi);
}
