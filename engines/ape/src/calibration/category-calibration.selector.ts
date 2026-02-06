import { CategoryCode, CategoryCalibration } from "./category-calibration.types";
import {
  GEN_CALIBRATION,
  OBC_CALIBRATION,
  SC_CALIBRATION,
  ST_CALIBRATION,
} from "./category-calibration.profiles";

export function getCategoryCalibration(
  category: CategoryCode
): CategoryCalibration {
  switch (category) {
    case "OBC":
      return OBC_CALIBRATION;
    case "SC":
      return SC_CALIBRATION;
    case "ST":
      return ST_CALIBRATION;
    case "GEN":
    default:
      return GEN_CALIBRATION;
  }
}
