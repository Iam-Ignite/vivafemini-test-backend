import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CyclesModule } from './modules/cycles/cycles.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { HealthReportModule } from './modules/health-report/health-report.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { TipsModule } from './modules/tips/tips.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/vivafemini'),
    UsersModule,
    CyclesModule,
    TrackingModule,
    HealthReportModule,
    ArticlesModule,
    TipsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
