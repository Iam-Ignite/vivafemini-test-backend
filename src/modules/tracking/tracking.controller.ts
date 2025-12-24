import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import type { CreateDailyLogDto } from './tracking.service';
import { UsersService } from '../users/users.service';

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getLogs(@Query('limit') limit?: number) {
    const user = await this.usersService.getFirstUser();
    if (!user) return [];
    return this.trackingService.getRecentLogs(user._id.toString(), limit || 30);
  }

  @Get('calendar/:year/:month')
  async getCalendarData(
    @Param('year') year: string,
    @Param('month') month: string,
  ) {
    const user = await this.usersService.getFirstUser();
    if (!user) return {};
    return this.trackingService.getCalendarData(
      user._id.toString(),
      parseInt(year),
      parseInt(month),
    );
  }

  @Get(':date')
  async getDayLog(@Param('date') date: string) {
    const user = await this.usersService.getFirstUser();
    if (!user) return null;
    return this.trackingService.findByDate(user._id.toString(), date);
  }

  @Post()
  async createDayLog(@Body() data: CreateDailyLogDto) {
    const user = await this.usersService.getFirstUser();
    if (!user) return { message: 'No user found' };
    return this.trackingService.create(user._id.toString(), data);
  }

  @Patch(':date')
  async updateDayLog(
    @Param('date') date: string,
    @Body() data: Partial<CreateDailyLogDto>,
  ) {
    const user = await this.usersService.getFirstUser();
    if (!user) return { message: 'No user found' };
    return this.trackingService.update(user._id.toString(), date, data);
  }

  @Delete(':date')
  async deleteDayLog(@Param('date') date: string) {
    const user = await this.usersService.getFirstUser();
    if (!user) return { message: 'No user found' };
    await this.trackingService.delete(user._id.toString(), date);
    return { success: true };
  }
}
