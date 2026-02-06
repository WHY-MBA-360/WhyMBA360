import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { normalizeAcademics } from "./academics";
import { applyInstituteCutoffCurve } from "./cutoff-curves";
import { applyWorkExCurve } from "./workex-curves";
import { WEIGHTS } from "./weights";

export class AdmissionProbabilityService {
  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    const academicsScore = normalizeAcademics(
      input.academics,
      input.institute
    );

    const scoreCurve = applyInstituteCutoffCurve(
      input.institute,
      input.score / 100
    );

    const workExScore = applyWorkExCurve(
      input.institute,
      input.workExMonths
    );

    const composite =
      academicsScore * WEIGHTS.academics +
      scoreCurve * WEIGHTS.score +
      workExScore * WEIGHTS.workEx;

    return {
      probability: Math.round(
        Math.min(1, composite) * 100
      ),
      institute: input.institute,
    };
  }
}
