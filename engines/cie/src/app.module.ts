import { Module } from "@nestjs/common";
import { OperatorModule } from "./operator/operator.module";
import { ScoreNormalizerModule } from "./exam-engines";

@Module({
  imports: [
    OperatorModule,
    ScoreNormalizerModule,
  ],
})
export class AppModule {}
