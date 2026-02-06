import { CalibrationWeights } from "./calibration.types";

/**
 * v1 calibration weights.
 * Deterministic defaults – replaceable by learned values later.
 */
export const DEFAULT_CALIBRATION_V1: CalibrationWeights = {
  academicsWeight: 0.65,
  workExWeight: 0.35,
  streamBias: 1.0,
  degreeBias: 1.0,
  trendBias: 1.0,
};
