import { Module } from '@nestjs/common';
import { portfolio-optimizer } from './portfolio-optimizer.service';

@Module({
  providers: [portfolio-optimizerEngineService],
  exports: [portfolio-optimizerEngineService],
})
export class portfolio-optimizerEngineModule {}
