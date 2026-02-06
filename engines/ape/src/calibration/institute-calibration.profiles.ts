import { InstituteCalibration } from "./institute-calibration.types";

/**
 * IIM Ahmedabad
 * Academics-heavy, low work-ex preference
 */
export const IIM_A_CALIBRATION: InstituteCalibration = {
  academicsWeight: 0.75,
  workExWeight: 0.25,
  streamBias: 1.0,
  degreeBias: 1.2,
  trendBias: 1.1,
};

/**
 * IIM Bangalore
 * Balanced profile
 */
export const IIM_B_CALIBRATION: InstituteCalibration = {
  academicsWeight: 0.65,
  workExWeight: 0.35,
  streamBias: 1.0,
  degreeBias: 1.0,
  trendBias: 1.0,
};

/**
 * IIM Calcutta
 * Work-ex friendly
 */
export const IIM_C_CALIBRATION: InstituteCalibration = {
  academicsWeight: 0.6,
  workExWeight: 0.4,
  streamBias: 0.95,
  degreeBias: 0.9,
  trendBias: 1.0,
};
