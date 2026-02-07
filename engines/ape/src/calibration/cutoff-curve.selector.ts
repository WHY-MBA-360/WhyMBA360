import { InstituteCode } from "./institute-calibration.types";
import { CutoffCurve } from "./cutoff-curve.types";
import {
  IIM_A_CURVE,
  IIM_B_CURVE,
  IIM_C_CURVE,
} from "./cutoff-curve.profiles";

export function getCutoffCurve(
  institute: InstituteCode
): CutoffCurve {
  switch (institute) {
    case "IIM_A":
      return IIM_A_CURVE;
    case "IIM_B":
      return IIM_B_CURVE;
    case "IIM_C":
    default:
      return IIM_C_CURVE;
  }
}
