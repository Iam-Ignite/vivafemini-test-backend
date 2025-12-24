import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { UsersService } from '../users/users.service';

@Controller('cycles')
export class CyclesController {
  constructor(
    private readonly cyclesService: CyclesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getAllCycles() {
    const user = await this.usersService.getFirstUser();
    if (!user) return [];
    return this.cyclesService.findByUserId(user._id.toString());
  }

  @Get('current')
  async getCurrentCycle() {
    const user = await this.usersService.getFirstUser();
    if (!user) return null;

    const cycle = await this.cyclesService.getCurrentCycle(user._id.toString());
    if (!cycle) return null;

    const predictions = this.cyclesService.calculatePredictions(user, cycle);

    return {
      cycle,
      predictions,
    };
  }

  @Get('predictions')
  async getPredictions() {
    const user = await this.usersService.getFirstUser();
    if (!user) return null;
    return this.cyclesService.getPredictions(user._id.toString());
  }

  @Post()
  async startNewCycle(@Body('startDate') startDate: string) {
    const user = await this.usersService.getFirstUser();
    if (!user) return { message: 'No user found' };

    return this.cyclesService.create({
      userId: user._id.toString(),
      startDate: new Date(startDate),
    });
  }

  @Patch(':id')
  async updateCycle(@Param('id') id: string, @Body() updateData: any) {
    return this.cyclesService.update(id, updateData);
  }

  @Patch(':id/pregnancy-test')
  async updatePregnancyTest(
    @Param('id') id: string,
    @Body('result') result: 'positive' | 'negative' | 'faint' | 'not_taken',
  ) {
    return this.cyclesService.updatePregnancyTest(id, result);
  }
}
