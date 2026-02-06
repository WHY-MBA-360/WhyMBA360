import { Controller, Get } from '@nestjs/common';

@Controller('operator')
export class OperatorController {

  @Get('regions')
  getRegions() {
    return {
      status: 'OK',
      regions: [
        { region: 'North', aspirants: 12000 },
        { region: 'West', aspirants: 16000 },
        { region: 'South', aspirants: 14000 },
        { region: 'East', aspirants: 9000 },
      ],
    };
  }
}
