import { Module } from '@nestjs/common';
import { QueueModule } from './queues/queue.module';
import { ScoreProcessor } from './queues/score.processor';

@Module({
  imports: [QueueModule],
  providers: [ScoreProcessor],
})
export class WorkerModule {}
