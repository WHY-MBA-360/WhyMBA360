export interface CutoffCurve {
  midpoint: number;   // score where probability ˜ 50
  steepness: number;  // curve sharpness
}
