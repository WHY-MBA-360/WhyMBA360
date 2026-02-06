import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { normalizeAcademics } from "./academics";
import { WEIGHTS } from "./weights";

export class AdmissionProbabilityService {
  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    const academicsScore = normalizeAcademics(
      input.academics,
      input.institute
    );

    const composite =
      academicsScore * WEIGHTS.academics +
      (input.score / 100) * WEIGHTS.score +
      Math.min(1, input.workExMonths / 36) *
        WEIGHTS.workEx;

    return {
      probability: Math.round(
        Math.min(1, composite) * 100
      ),
      institute: input.institute,
    };
  }
}
