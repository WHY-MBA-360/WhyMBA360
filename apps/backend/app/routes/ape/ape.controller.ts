import { Body, Controller, Post } from "@nestjs/common";
import { ApeAdapter } from "./ape.adapter";

@Controller("api/ape/v1")
export class ApeController {
  constructor(private readonly adapter: ApeAdapter) {}

  @Post("admission-probability")
  calculate(@Body() input: unknown) {
    return this.adapter.calculate(input as any);
  }
}
