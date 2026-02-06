import { Module } from "@nestjs/common";
import { ApeController } from "./routes/ape.controller";
import { AdmissionProbabilityService } from "../../../engines/ape/src/admission-probability.service";

@Module({
  controllers: [ApeController],
  providers: [AdmissionProbabilityService],
})
export class AppModule {}
