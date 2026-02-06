import { Module } from "@nestjs/common";
import { OperatorModule } from "./operator/operator.module";
import { ScoreNormalizerModule } from "./exam-engines/score-normalizer/score-normalizer.module";

@Module({
  imports: [
    OperatorModule,
    ScoreNormalizerModule,
  ],
})
export class AppModule {}
