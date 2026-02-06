import { Module } from '@nestjs/common';

import { OperatorController } from './controllers/operator.controller';
import { OperatorCampaignController } from './controllers/operator.campaign.controller';

import { OperatorService } from './services/operator.service';
import { OperatorCampaignService } from './services/operator.campaign.service';

@Module({
  controllers: [
    OperatorController,
    OperatorCampaignController,
  ],
  providers: [
    OperatorService,
    OperatorCampaignService,
  ],
})
export class OperatorModule {}
