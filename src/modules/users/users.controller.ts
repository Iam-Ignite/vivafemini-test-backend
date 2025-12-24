import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // For demo: get the first user (mock auth)
  @Get('me')
  async getCurrentUser() {
    const user = await this.usersService.getFirstUser();
    if (!user) {
      return { message: 'No user found. Please run seed.' };
    }
    return user;
  }

  @Patch('me')
  async updateCurrentUser(@Body() updateData: Partial<{ firstName: string; lastName: string; avatarUrl: string }>) {
    const user = await this.usersService.getFirstUser();
    if (!user) {
      return { message: 'No user found' };
    }
    return this.usersService.update(user._id.toString(), updateData);
  }

  @Post('me/dismiss-card')
  async dismissCard(@Body('cardId') cardId: string) {
    const user = await this.usersService.getFirstUser();
    if (!user) {
      return { message: 'No user found' };
    }
    return this.usersService.dismissCard(user._id.toString(), cardId);
  }
}
