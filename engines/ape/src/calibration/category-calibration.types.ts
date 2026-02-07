export type CategoryCode = "GEN" | "OBC" | "SC" | "ST";

export interface CategoryCalibration {
  cutoffRelaxation: number; // score offset
  probabilityBoost: number; // final probability boost
}
