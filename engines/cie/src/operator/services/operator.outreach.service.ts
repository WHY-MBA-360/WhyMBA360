import { Injectable } from '@nestjs/common';

@Injectable()
export class OperatorOutreachService {
  getCohortContacts(cohortId: string) {
    return {
      cohortId,
      totalContacts: 3,
      contacts: [
        {
          id: 'asp-1',
          name: 'Rajesh Kumar',
          phone: '+919876543210',
          email: 'rajesh@email.com',
          city: 'Mumbai',
          intentScore: 82,
          leadStage: 'Hot',
          lastAction: 'Downloaded NMIMS Brochure',
          lastContact: '2 days ago (WhatsApp)',
        },
        {
          id: 'asp-2',
          name: 'Amit Shah',
          phone: '+919812345678',
          email: 'amit@email.com',
          city: 'Pune',
          intentScore: 74,
          leadStage: 'Warm',
          lastAction: 'Visited Fees Page',
          lastContact: 'Never Contacted',
        },
        {
          id: 'asp-3',
          name: 'Neha Verma',
          phone: '+919800112233',
          email: 'neha@email.com',
          city: 'Mumbai',
          intentScore: 68,
          leadStage: 'Cold',
          lastAction: 'Webinar Attended',
          lastContact: '5 days ago (Email)',
        },
      ],
    };
  }
}
