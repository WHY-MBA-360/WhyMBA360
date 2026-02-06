@Injectable()
export class ScoreProducer {
  constructor(
    @InjectQueue('score-processing')
    private readonly queue: Queue,
  ) {}

  async enqueue(payload: any) {
    return this.queue.add('process-score', payload);
  }
}
