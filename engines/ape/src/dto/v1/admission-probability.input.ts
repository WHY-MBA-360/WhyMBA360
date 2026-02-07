import { ExamType } from "../../../cie";
import { Institute } from "./institute.types";
import { Category } from "./category.types";
import { Stream } from "../../stream";
import { DegreeTier } from "../../degree";
import { AcademicTrend } from "../../trend";

export interface AdmissionProbabilityInputV1 {
  exam: ExamType;
  institute: Institute;
  category: Category;

  normalizedScore: number;
  workExMonths: number;

  stream: Stream;
  degreeTier: DegreeTier;
  academicTrend: AcademicTrend;
}
