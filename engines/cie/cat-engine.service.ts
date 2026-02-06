// src/exam-engines/cat-engine/cat-engine.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IIMAdmissionModel } from '../../database/entities/iim-admission-model.entity';
import { HistoricalCutoff } from '../../database/entities/historical-cutoff.entity';

@Injectable()
export class CatEngineService {
  constructor(
    @InjectRepository(IIMAdmissionModel)
    private iimModelRepo: Repository<IIMAdmissionModel>,
    @InjectRepository(HistoricalCutoff)
    private cutoffRepo: Repository<HistoricalCutoff>,
  ) {}

  async analyzeCatScore(userScore: any, userCategory: string) {
    const models = await this.iimModelRepo.find({
      where: { year: new Date().getFullYear() },
    });

    const results = [];

    for (const model of models) {
      const cutoff = await this.cutoffRepo.findOne({
        where: {
          iimId: model.id,
          year: model.year,
          category: userCategory
        },
      });

      // Calculate composite score (example formula, adjust as needed)
      const compositeScore = this.calculateCompositeScore(userScore);

      const classification = this.classifyChance(compositeScore, cutoff?.compositeCutoff);

      results.push({
        iimName: model.iimName,
        compositeScore,
        historicalCutoff: cutoff?.compositeCutoff,
        confidenceBand: this.calculateConfidenceBand(model.dataSource),
        classification,
      });
    }

    return results;
  }

  private calculateCompositeScore(userScore: any): number {
    // Implement your composite score calculation
    return 0; // Replace with actual calculation
  }

  private classifyChance(compositeScore: number, historicalCutoff: number | undefined): string {
    if (!historicalCutoff) return 'Unknown';
    if (compositeScore >= historicalCutoff * 1.1) return 'High';
    if (compositeScore >= historicalCutoff * 0.9) return 'Medium';
    return 'Low';
  }

  private calculateConfidenceBand(dataSource: string): string {
    // Implement based on data source quality
    return 'Medium';
  }
}