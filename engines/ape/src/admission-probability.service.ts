import { Injectable } from "@nestjs/common";
import {
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "./dto/admission-probability.input";
import { CATEGORY_CUTOFFS } from "./cutoffs";
import { COLLEGE_WEIGHTS } from "./weights";

@Injectable()
export class AdmissionProbabilityService {
  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    const normalizedScore = this.normalizeExam(
      input.exam,
      input.rawScore
    );

    const cutoff =
      CATEGORY_CUTOFFS[input.college][input.category];

    const scoreSignal = this.clamp(normalizedScore / 100);

    const academicsSignal = this.clamp(
      (input.academics.class10 +
        input.academics.class12 +
        input.academics.graduation) /
        300
    );

    const workExSignal = this.clamp(
      input.workExMonths / 36
    );

    const weights = COLLEGE_WEIGHTS[input.college];

    const probability =
      scoreSignal * weights.score +
      academicsSignal * weights.academics +
      workExSignal * weights.workEx;

    return {
      probability: Number(probability.toFixed(2)),
      meetsCutoff: normalizedScore >= cutoff,
      breakdown: {
        score: Number(scoreSignal.toFixed(2)),
        academics: Number(academicsSignal.toFixed(2)),
        workEx: Number(workExSignal.toFixed(2)),
      },
    };
  }

  private normalizeExam(exam: string, raw: number): number {
    switch (exam) {
      case "CAT":
        return raw;
      case "NMAT":
        return raw / 3;
      case "XAT":
        return raw / 2;
      default:
        return 0;
    }
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(1, value));
  }
}
