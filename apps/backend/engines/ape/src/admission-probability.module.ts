import { Module } from "@nestjs/common";
import { AdmissionProbabilityService } from "./admission-probability.service";

@Module({
  providers: [AdmissionProbabilityService],
  exports: [AdmissionProbabilityService],
})
export class AdmissionProbabilityModule {}
