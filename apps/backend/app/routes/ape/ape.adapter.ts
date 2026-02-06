import { Injectable } from "@nestjs/common";
import {
  AdmissionProbabilityService,
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "../../../../engines/ape/src";

@Injectable()
export class ApeAdapter {
  constructor(
    private readonly apeService: AdmissionProbabilityService
  ) {}

  calculate(
    input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    return this.apeService.calculate(input);
  }
}
