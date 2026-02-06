import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEngineService } from './cat-engine.service';
import { IIMAdmissionModel } from '../../database/entities/iim-admission-model.entity';
import { HistoricalCutoff } from '../../database/entities/historical-cutoff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IIMAdmissionModel, HistoricalCutoff])],
  providers: [CatEngineService],
  exports: [CatEngineService],
})
export class CatEngineModule {}
