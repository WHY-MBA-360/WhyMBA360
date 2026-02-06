import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { DEFAULT_CALIBRATION_V1 } from "./calibration";
import { buildExplanation } from "./explain";

@Injectable()
export class AdmissionProbabilityService {

  private readonly calibration = DEFAULT_CALIBRATION_V1;

  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {

    const academicScore = input.score;
    const workExScore = input.workExMonths ?? 0;

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
      score: academicScore * this.calibration.academicsWeight,
      workEx: workExScore * this.calibration.workExWeight,
      stream: streamBias * this.calibration.streamBias,
      degree: degreeBias * this.calibration.degreeBias,
      trend: trendBias * this.calibration.trendBias,
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
