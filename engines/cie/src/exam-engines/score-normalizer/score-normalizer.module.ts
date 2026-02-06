import { Module } from "@nestjs/common";
import { ScoreNormalizerService } from "./score-normalizer.service";

@Module({
  providers: [ScoreNormalizerService],
  exports: [ScoreNormalizerService],
})
export class ScoreNormalizerModule {}
