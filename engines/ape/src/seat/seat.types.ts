export interface InstituteSeatInfo {
  institute: string;
  totalSeats: number;
}

export interface SeatWeightedScore {
  institute: string;
  probability: number;
  totalCost: number;
  totalSeats: number;
  seatWeightedRoi: number;
}
