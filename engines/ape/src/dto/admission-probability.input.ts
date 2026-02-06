import { InstituteCode } from "../calibration/institute-calibration.types";
import { CategoryCode } from "../calibration/category-calibration.types";

export interface AdmissionProbabilityInput {
  institute: InstituteCode;
  category: CategoryCode;
  score: number;
  workExMonths?: number;
  stream: "ENGINEER" | "NON_ENGINEER";
  degreeTier: "IIT" | "NIT" | "PRIVATE";
  academicTrend: "UP" | "FLAT" | "DOWN";
}
