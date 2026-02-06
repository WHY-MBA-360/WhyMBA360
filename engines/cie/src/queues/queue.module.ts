import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueController } from './queue.controller';
import { ScoreProducer } from './score.producer';
import { ScoreProcessor } from './score.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'score-processing',
    }),
  ],
  controllers: [QueueController],
  providers: [ScoreProducer, ScoreProcessor],
})
export class QueueModule {}
