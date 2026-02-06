import { Injectable } from "@nestjs/common";
import {
  AdmissionProbabilityService,
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "engines/ape";

@Injectable()
export class ApeAdapter {
  constructor(private readonly service: AdmissionProbabilityService) {}

  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    return this.service.calculate(input);
  }
}
