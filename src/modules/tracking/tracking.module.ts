import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyLog, DailyLogSchema } from './daily-log.schema';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DailyLog.name, schema: DailyLogSchema }]),
    UsersModule,
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService, MongooseModule],
})
export class TrackingModule {}
