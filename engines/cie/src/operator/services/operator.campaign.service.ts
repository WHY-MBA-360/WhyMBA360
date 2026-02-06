import { Injectable } from '@nestjs/common';

/**
 * DTO for sending a campaign
 */
export interface SendCampaignPayload {
  cohortId: string;
  channel: 'whatsapp' | 'email';
  template: string;
  operator: string;
}

@Injectable()
export class OperatorCampaignService {

  sendCampaign(payload: SendCampaignPayload) {
    return {
      status: 'SENT',
      cohortId: payload.cohortId,
      channel: payload.channel,
      template: payload.template,
      operator: payload.operator,
      sentAt: new Date().toISOString(),
    };
  }
}
