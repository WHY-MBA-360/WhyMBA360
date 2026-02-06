import { InstituteCode, InstituteCalibration } from "./institute-calibration.types";
import {
  IIM_A_CALIBRATION,
  IIM_B_CALIBRATION,
  IIM_C_CALIBRATION,
} from "./institute-calibration.profiles";

export function getInstituteCalibration(
  institute: InstituteCode
): InstituteCalibration {
  switch (institute) {
    case "IIM_A":
      return IIM_A_CALIBRATION;
    case "IIM_B":
      return IIM_B_CALIBRATION;
    case "IIM_C":
      return IIM_C_CALIBRATION;
    default:
      return IIM_B_CALIBRATION;
  }
}
