import { InstituteSeatInfo, SeatWeightedScore } from "./seat.types";
import { BudgetedInstituteScore } from "../budget";

export function applySeatWeighting(
  budgeted: BudgetedInstituteScore[],
  seats: InstituteSeatInfo[]
): SeatWeightedScore[] {

  const seatMap = new Map<string, number>();
  seats.forEach(s => seatMap.set(s.institute, s.totalSeats));

  return budgeted
    .map(b => {
      const totalSeats = seatMap.get(b.institute);
      if (!totalSeats) return null;

      return {
        institute: b.institute,
        probability: b.probability,
        totalCost: b.totalCost,
        totalSeats,
        seatWeightedRoi:
          (b.probability * Math.log(totalSeats + 1)) / b.totalCost,
      };
    })
    .filter((x): x is SeatWeightedScore => !!x)
    .sort((a, b) => b.seatWeightedRoi - a.seatWeightedRoi);
}
