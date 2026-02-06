import { Module } from "@nestjs/common";
import { AdmissionProbabilityModule } from "../../../../engines/ape";
import { ApeController } from "./ape.controller";

@Module({
  imports: [AdmissionProbabilityModule],
  controllers: [ApeController],
})
export class ApeModule {}
