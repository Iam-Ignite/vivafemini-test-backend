import { Controller, Get, Query } from '@nestjs/common';
import { HealthReportService } from './health-report.service';
import { UsersService } from '../users/users.service';

@Controller('health-report')
export class HealthReportController {
  constructor(
    private readonly healthReportService: HealthReportService,
    private readonly usersService: UsersService,
  ) {}

  @Get('summary')
  async getCycleSummary() {
    const user = await this.usersService.getFirstUser();
    if (!user) {
      return {
        cycleLength: 28,
        periodDuration: 5,
        estimatedNextPeriod: 'Not available',
        ovulationWindow: 'Not available',
      };
    }
    return this.healthReportService.getCycleSummary(user._id.toString());
  }

  @Get('symptom-frequency')
  async getSymptomFrequency() {
    const user = await this.usersService.getFirstUser();
    if (!user) return { physicalPain: 0, moodMental: 0, digestionAppetite: 0, sexualHealth: 0 };
    return this.healthReportService.getSymptomFrequency(user._id.toString());
  }

  @Get('period-length')
  async getPeriodLengthData() {
    const user = await this.usersService.getFirstUser();
    if (!user) return [];
    return this.healthReportService.getPeriodLengthData(user._id.toString());
  }

  @Get('historical')
  async getHistoricalData(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const user = await this.usersService.getFirstUser();
    if (!user) return { data: [], total: 0, page: 1, totalPages: 0 };
    return this.healthReportService.getHistoricalData(
      user._id.toString(),
      parseInt(page || '1'),
      parseInt(limit || '10'),
    );
  }

  @Get('trends')
  async getTrends() {
    const user = await this.usersService.getFirstUser();
    if (!user) return { mostFrequentSymptom: 'None', symptomIntensityChange: 'stable' };
    return this.healthReportService.getTrends(user._id.toString());
  }

  @Get('flow-summary')
  async getFlowSymptomSummary() {
    const user = await this.usersService.getFirstUser();
    if (!user) {
      return {
        averageCycleLength: 28,
        description: 'Start tracking to see your personalized flow and symptom summary.',
        tips: [],
      };
    }
    return this.healthReportService.getFlowSymptomSummary(user._id.toString());
  }
}
