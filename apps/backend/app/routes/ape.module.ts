import { Module } from "@nestjs/common";
import { AdmissionProbabilityModule } from "../../../engines/ape/src";
import { ApeController } from "./ape.controller";

@Module({
  imports: [AdmissionProbabilityModule],
  controllers: [ApeController],
})
export class ApeModule {}
