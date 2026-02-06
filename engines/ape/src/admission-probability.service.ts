import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { getInstituteCalibration } from "./calibration";
import { buildExplanation } from "./explain";

@Injectable()
export class AdmissionProbabilityService {

  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {

    const calibration = getInstituteCalibration(input.institute);

    const streamBias =
      input.stream === "ENGINEER" ? -3 : 2;

    const degreeBias =
      input.degreeTier === "IIT" ? 6 :
      input.degreeTier === "NIT" ? 4 :
      1;

    const trendBias =
      input.academicTrend === "UP" ? 4 :
      input.academicTrend === "DOWN" ? -4 :
      0;

    const factors = {
      score: input.score * calibration.academicsWeight,
      workEx: (input.workExMonths ?? 0) * calibration.workExWeight,
      stream: streamBias * calibration.streamBias,
      degree: degreeBias * calibration.degreeBias,
      trend: trendBias * calibration.trendBias,
    };

    const raw =
      factors.score +
      factors.workEx +
      factors.stream +
      factors.degree +
      factors.trend;

    const probability = Math.max(0, Math.min(100, Math.round(raw)));

    return {
      institute: input.institute,
      probability,
      explanation: buildExplanation(probability, factors),
    };
  }
}
