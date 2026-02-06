import { Controller, Get, Query } from '@nestjs/common';
import { CohortService } from '../services/cohort.service';

@Controller('operator/cohort')
export class OperatorCohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Get()
  getCohort(
    @Query('region') region: string,
    @Query('minIntent') minIntent: string
  ) {
    return this.cohortService.getCohort(
      region,
      Number(minIntent || 0)
    );
  }
}
