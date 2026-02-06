import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IIMAdmissionModel } from '../../database/entities/iim-admission-model.entity';
import { HistoricalCutoff } from '../../database/entities/historical-cutoff.entity';

@Injectable()
export class CatEngineService {
  private readonly logger = new Logger(CatEngineService.name);

  constructor(
    @InjectRepository(IIMAdmissionModel)
    private iimModelRepo: Repository<IIMAdmissionModel>,
    @InjectRepository(HistoricalCutoff)
    private cutoffRepo: Repository<HistoricalCutoff>,
  ) {}

  async predictIIMCalls(userProfile: any, catScore: any): Promise<any[]> {
    const iimModels = await this.iimModelRepo.find({
      where: { year: new Date().getFullYear() },
    });

    const results = [];

    for (const model of iimModels) {
      const compositeScore = this.calculateCompositeScore(userProfile, catScore, model);
      const cutoff = await this.cutoffRepo.findOne({
        where: {
          iimId: model.id,
          year: new Date().getFullYear() - 1,
          category: userProfile.category,
        },
      });

      const classification = this.classifyChance(compositeScore, cutoff?.compositeCutoff);

      results.push({
        iimName: model.iimName,
        category: userProfile.category,
        predictedCompositeScore: compositeScore,
        historicalCutoff: cutoff?.compositeCutoff,
        confidenceBand: this.calculateConfidenceBand(model.dataSource),
        classification,
        reasoning: this.generateReasoning(compositeScore, cutoff, classification),
      });
    }

    return results;
  }

  private calculateCompositeScore(userProfile: any, catScore: any, model: any): number {
    const weights = model.stage1Weights;
    
    const normalizedCAT = this.normalizeCATPercentile(catScore.overallPercentile);
    const academicIndex = this.calculateAcademicIndex(userProfile.academicScores, model.normalizationRules);
    const workExScore = this.normalizeWorkExperience(userProfile.workExMonths);

    return (normalizedCAT * weights.cat) +
           (academicIndex * weights.academics) +
           (workExScore * weights.workex) +
           (userProfile.genderFactor * weights.gender) +
           (userProfile.diversityFactor * weights.diversity);
  }

  private normalizeCATPercentile(percentile: number): number {
    return percentile;
  }

  private calculateAcademicIndex(academicScores: any, normalizationRules: any): number {
    // Implementation based on earlier logic
    return 0; // Replace with actual implementation
  }

  private normalizeWorkExperience(workExMonths: number): number {
    return Math.min(workExMonths / 60, 1) * 100;
  }

  private classifyChance(compositeScore: number, historicalCutoff?: number): 'SAFE' | 'TARGET' | 'DREAM' {
    if (!historicalCutoff) return 'DREAM';
    if (compositeScore >= historicalCutoff) return 'SAFE';
    if (compositeScore >= historicalCutoff * 0.9) return 'TARGET';
    return 'DREAM';
  }

  private calculateConfidenceBand(dataSource: string): 'HIGH' | 'MEDIUM' | 'LOW' {
    switch (dataSource) {
      case 'RTI': return 'HIGH';
      case 'Official': return 'HIGH';
      case 'Crowdsourced': return 'MEDIUM';
      default: return 'LOW';
    }
  }

  private generateReasoning(compositeScore: number, cutoff: any, classification: string): string[] {
    return [
      `Composite Score: ${compositeScore.toFixed(2)}`,
      cutoff ? `Last Year Cutoff: ${cutoff.compositeCutoff}` : 'No historical data',
      `Classification: ${classification}`,
    ];
  }
}
