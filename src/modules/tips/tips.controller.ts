import { Controller, Get, Param, Query } from '@nestjs/common';
import { TipsService } from './tips.service';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Get()
  async getTips(@Query('cycleDay') cycleDay?: string) {
    if (cycleDay) {
      return this.tipsService.findByCycleDay(parseInt(cycleDay));
    }
    return this.tipsService.findAll();
  }

  @Get('day/:dayNumber')
  async getTipsByDay(@Param('dayNumber') dayNumber: string) {
    return this.tipsService.findByCycleDay(parseInt(dayNumber));
  }
}
