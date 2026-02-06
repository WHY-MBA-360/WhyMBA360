export interface CalibrationPoint {
  score: number;          // normalized 0–1
  admitted: boolean;
}

export interface InstituteCalibrationData {
  institute: string;
  points: CalibrationPoint[];
}
