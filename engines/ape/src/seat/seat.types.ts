export interface InstituteSeatMeta {
  institute: string;
  seatCount: number;
}

export interface SeatWeightedROI {
  institute: string;
  probability: number;
  seatCount: number;
  totalCost: number;
  weightedRoi: number;
}
