import { Controller, Get, Param } from '@nestjs/common';

@Controller('operator/college')
export class OperatorCollegeController {

  @Get(':code')
  getCollegeDrilldown(@Param('code') code: string) {
    return {
      collegeCode: code,
      totalLeads: 100,
      cohort: [
        {
          city: 'Delhi',
          intentScore: 82,
          leadStage: 'Hot',
        },
        {
          city: 'Mumbai',
          intentScore: 61,
          leadStage: 'Warm',
        },
        {
          city: 'Bangalore',
          intentScore: 34,
          leadStage: 'Cold',
        },
      ],
    };
  }
}
