import { Injectable } from '@nestjs/common';

@Injectable()
export class OperatorService {
  getCohort() {
    return Array.from({ length: 100 }).map((_, index) => ({
      aspirantId: `ASP-${1000 + index}`,
      region: ['North', 'West', 'South', 'East'][index % 4],
      examTargets: ['CAT', 'XAT', 'SNAP', 'NMAT'],
      interestedCollege:
        [
          'IIM Ahmedabad',
          'JBIMS Mumbai',
          'SPJIMR',
          'IIM Bangalore',
          'XLRI',
        ][index % 5],
      intentScore: Math.floor(Math.random() * 100),
      lastActiveDaysAgo: Math.floor(Math.random() * 14),
      leadStage: ['Cold', 'Warm', 'Hot'][index % 3],
    }));
  }
}
