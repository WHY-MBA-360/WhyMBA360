import { Controller, Get, Post, Body } from '@nestjs/common';
import { OperatorCampaignService, SendCampaignPayload } from '../services/operator.campaign.service';

@Controller('operator/campaign')
export class OperatorCampaignController {
  constructor(
    private readonly campaignService: OperatorCampaignService
  ) {}

  @Get()
  getCampaigns() {
    return {
      status: 'OK',
      campaigns: [
        {
          campaignCode: 'WA-NM-WEST-412',
          channel: 'whatsapp',
          cohort: 'NM-WEST-412',
          sent: 412,
          delivered: 398,
          read: 312,
          replied: 47,
        },
      ],
    };
  }

  @Post('send')
  sendCampaign(@Body() payload: SendCampaignPayload) {
    return this.campaignService.sendCampaign(payload);
  }
}
