import { Module } from '@nestjs/common';
import { HealthReportService } from './health-report.service';
import { HealthReportController } from './health-report.controller';
import { UsersModule } from '../users/users.module';
import { TrackingModule } from '../tracking/tracking.module';
import { CyclesModule } from '../cycles/cycles.module';

@Module({
  imports: [UsersModule, TrackingModule, CyclesModule],
  controllers: [HealthReportController],
  providers: [HealthReportService],
})
export class HealthReportModule {}
