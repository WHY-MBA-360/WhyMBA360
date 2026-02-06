import { Injectable } from "@nestjs/common";
import {
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "./dto/admission-probability.input";
import { CATEGORY_CUTOFFS } from "./cutoffs";

@Injectable()
export class AdmissionProbabilityService {
  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    const normalized = this.normalize(input.exam, input.rawScore);

    const cutoff =
      CATEGORY_CUTOFFS[input.college][input.category];

    const delta = normalized - cutoff;

    // Simple deterministic curve
    const probability = Math.max(
      0,
      Math.min(1, 0.5 + delta / 20)
    );

    return {
      probability: Number(probability.toFixed(2)),
      meetsCutoff: normalized >= cutoff,
    };
  }

  private normalize(exam: string, raw: number): number {
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
}
