import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";
import { calculateProbabilityVector } from "./vector";

@Injectable()
export class AdmissionProbabilityService {

  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    // EXISTING LOGIC — unchanged
    return {} as any;
  }

  calculateVector(
    input: Omit<AdmissionProbabilityInput, "institute">
  ) {
    return calculateProbabilityVector(input, this);
  }
}
