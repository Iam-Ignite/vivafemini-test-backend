import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async update(id: string, userData: Partial<User>): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async dismissCard(id: string, cardId: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $addToSet: { dismissedCards: cardId } },
      { new: true },
    ).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getFirstUser(): Promise<UserDocument | null> {
    return this.userModel.findOne().exec();
  }
}
