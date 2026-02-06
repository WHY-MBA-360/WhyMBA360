import { Module } from '@nestjs/common';
import { OperatorModule } from './operator/operator.module';

@Module({
  imports: [
    OperatorModule
  ],
})
export class AppModule {}
