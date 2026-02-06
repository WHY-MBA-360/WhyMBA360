import { Module } from "@nestjs/common";
import { ApeController } from "./ape.controller";
import { ApeAdapter } from "./ape.adapter";
import { AdmissionProbabilityModule } from "engines/ape";

@Module({
  imports: [AdmissionProbabilityModule],
  controllers: [ApeController],
  providers: [ApeAdapter],
})
export class ApeModule {}
