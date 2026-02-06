import { Controller, Post } from '@nestjs/common';
import { ScoreProducer } from './score.producer';

@Controller('queue')
export class QueueController {
  constructor(private readonly scoreProducer: ScoreProducer) {}

  @Post('test')
  async testQueue() {
    await this.scoreProducer.enqueue({
      userId: 42,
      exam: 'CAT',
      score: 97,
    });

    return { status: 'queued' };
  }
}
