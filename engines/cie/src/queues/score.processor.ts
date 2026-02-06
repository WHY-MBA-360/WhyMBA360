import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('score-processing')
export class ScoreProcessor {
  @Process('process-score')
  async handle(job: Job) {
    console.log('📥 Processing job:', job.data);
    return { status: 'processed' };
  }
}
