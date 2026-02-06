import { Injectable } from '@nestjs/common';

@Injectable()
export class OperatorCollegeService {
  getCollegeDrilldown(college: string) {
    return {
      college,
      totalAspirants: 4120,
      regions: {
        North: 1180,
        West: 940,
        South: 1610,
        East: 390,
      },
      examMix: {
        CAT: 82,
        XAT: 11,
        GMAT: 4,
        Other: 3,
      },
      intentBuckets: {
        High: 860,
        Medium: 2140,
        Low: 1120,
      },
      topSearchQueries: [
        'IIM Bangalore cutoff',
        'IIM Bangalore placements',
        'IIM Bangalore fees',
        'IIM Bangalore admission process',
      ],
      monetizationHint:
        'High intent cluster suitable for counselor outreach + college upsell',
    };
  }
}
