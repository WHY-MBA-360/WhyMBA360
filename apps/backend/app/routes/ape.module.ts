import { Module } from "@nestjs/common";
import { ApeController } from "./ape.controller";
import { AdmissionProbabilityModule } from "engines/ape";

@Module({
  imports: [AdmissionProbabilityModule],
  controllers: [ApeController],
})
export class ApeModule {}
