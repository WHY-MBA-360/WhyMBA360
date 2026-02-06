import { CategoryCalibration } from "./category-calibration.types";

export const GEN_CALIBRATION: CategoryCalibration = {
  cutoffRelaxation: 0,
  probabilityBoost: 0,
};

export const OBC_CALIBRATION: CategoryCalibration = {
  cutoffRelaxation: 3,
  probabilityBoost: 4,
};

export const SC_CALIBRATION: CategoryCalibration = {
  cutoffRelaxation: 6,
  probabilityBoost: 8,
};

export const ST_CALIBRATION: CategoryCalibration = {
  cutoffRelaxation: 8,
  probabilityBoost: 12,
};
