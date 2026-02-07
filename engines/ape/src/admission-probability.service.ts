import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { explainAllInstitutes } from "./explain";

@Injectable()
export class AdmissionProbabilityService {

  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    return {} as any;
  }

  explainVector(
    input: Omit<AdmissionProbabilityInput, "institute">
  ) {
    return explainAllInstitutes(input, this);
  }
}
