import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../modules/users/users.module';
import { CyclesModule } from '../modules/cycles/cycles.module';
import { TrackingModule } from '../modules/tracking/tracking.module';
import { ArticlesModule } from '../modules/articles/articles.module';
import { TipsModule } from '../modules/tips/tips.module';

@Module({
  imports: [
    UsersModule,
    CyclesModule,
    TrackingModule,
    ArticlesModule,
    TipsModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
