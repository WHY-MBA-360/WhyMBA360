import { Body, Controller, Post } from "@nestjs/common";
import {
  AdmissionProbabilityService,
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "../../../../engines/ape";

@Controller("api/ape/v1")
export class ApeController {
  constructor(private readonly apeService: AdmissionProbabilityService) {}

  @Post("admission-probability")
  calculate(
    @Body() input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    return this.apeService.calculate(input);
  }
}
