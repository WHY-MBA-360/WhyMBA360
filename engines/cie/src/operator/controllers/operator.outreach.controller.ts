import { Controller, Get, Query } from '@nestjs/common';
import { OperatorOutreachService } from '../services/operator.outreach.service';

@Controller('operator/outreach')
export class OperatorOutreachController {
  constructor(
    private readonly outreachService: OperatorOutreachService,
  ) {}

  @Get()
  getOutreachContacts(@Query('cohortId') cohortId: string) {
    return this.outreachService.getCohortContacts(cohortId);
  }
}
