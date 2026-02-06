import { Injectable } from '@nestjs/common';

@Injectable()
export class OperatorService {
  getRegionOverview() {
    return [
      {
        region: 'North',
        totalAspirants: 18420,
        topColleges: [
          { college: 'IIM Ahmedabad', count: 4200 },
          { college: 'FMS Delhi', count: 3100 },
          { college: 'MDI Gurgaon', count: 2100 },
        ],
      },
      {
        region: 'West',
        totalAspirants: 16200,
        topColleges: [
          { college: 'IIM Bangalore', count: 3900 },
          { college: 'JBIMS Mumbai', count: 2800 },
          { college: 'SPJIMR', count: 1900 },
        ],
      },
      {
        region: 'South',
        totalAspirants: 14100,
        topColleges: [
          { college: 'IIM Kozhikode', count: 3200 },
          { college: 'IIM Trichy', count: 2100 },
        ],
      },
      {
        region: 'East',
        totalAspirants: 9800,
        topColleges: [
          { college: 'IIM Calcutta', count: 4100 },
          { college: 'XLRI', count: 2600 },
        ],
      },
    ];
  }
}
