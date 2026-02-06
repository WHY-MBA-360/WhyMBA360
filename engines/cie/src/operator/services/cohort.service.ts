import { Injectable } from '@nestjs/common';

@Injectable()
export class CohortService {
  getCohort(region: string, minIntent: number) {
    // TEMP: mock data (will later connect DB)
    const aspirants = [
      { name: 'Rajesh Kumar', city: 'Mumbai', region: 'West', intentScore: 82 },
      { name: 'Amit Shah', city: 'Pune', region: 'West', intentScore: 74 },
      { name: 'Suresh Iyer', city: 'Bangalore', region: 'South', intentScore: 65 },
      { name: 'Vikram Singh', city: 'Delhi', region: 'North', intentScore: 91 },
    ];

    const filtered = aspirants
      .filter(a => a.region === region)
      .filter(a => a.intentScore >= minIntent)
      .map(a => ({
        name: a.name,
        city: a.city,
        intentScore: a.intentScore,
        leadStage:
          a.intentScore >= 80 ? 'Hot' :
          a.intentScore >= 60 ? 'Warm' :
          'Cold'
      }));

    return {
      region,
      minIntent,
      count: filtered.length,
      cohort: filtered
    };
  }
}
