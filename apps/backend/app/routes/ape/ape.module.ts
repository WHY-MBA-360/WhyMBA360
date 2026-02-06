import { Module } from "@nestjs/common";
import { AdmissionProbabilityModule } from "../../../../engines/ape";
import { ApeAdapter } from "./ape.adapter";
import { ApeController } from "./ape.controller";

@Module({
  imports: [AdmissionProbabilityModule],
  controllers: [ApeController],
  providers: [ApeAdapter],
})
export class ApeModule {}
