import { Body, Controller, Post } from "@nestjs/common";
import { ApeAdapter } from "./ape.adapter";
import {
  AdmissionProbabilityInput,
  AdmissionProbabilityOutput,
} from "../../../../engines/ape";

@Controller("api/ape/v1")
export class ApeController {
  constructor(private readonly ape: ApeAdapter) {}

  @Post("admission-probability")
  calculate(
    @Body() input: AdmissionProbabilityInput
  ): AdmissionProbabilityOutput {
    return this.ape.calculate(input);
  }
}
