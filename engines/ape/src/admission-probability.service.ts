import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import {
  getInstituteCalibration,
  getCategoryCalibration,
} from "./calibration";
import { buildExplanation } from "./explain";

@Injectable()
export class AdmissionProbabilityService {

  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {

    const institute = getInstituteCalibration(input.institute);
    const category = getCategoryCalibration(input.category);

    const baseScore =
      (input.score + category.cutoffRelaxation) *
      institute.academicsWeight;

    const workEx =
      (input.workExMonths ?? 0) * institute.workExWeight;

    const streamBias =
      (input.stream === "ENGINEER" ? -3 : 2) * institute.streamBias;

    const degreeBias =
      (input.degreeTier === "IIT" ? 6 :
       input.degreeTier === "NIT" ? 4 : 1) * institute.degreeBias;

    const trendBias =
      (input.academicTrend === "UP" ? 4 :
       input.academicTrend === "DOWN" ? -4 : 0) * institute.trendBias;

    const raw =
      baseScore +
      workEx +
      streamBias +
      degreeBias +
      trendBias +
      category.probabilityBoost;

    const probability = Math.max(0, Math.min(100, Math.round(raw)));

    return {
      institute: input.institute,
      probability,
      explanation: buildExplanation(probability, {
        baseScore,
        workEx,
        streamBias,
        degreeBias,
        trendBias,
        categoryBoost: category.probabilityBoost,
      }),
    };
  }
}
