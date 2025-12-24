import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cycle, CycleDocument } from './cycle.schema';
import { User, UserDocument } from '../users/user.schema';

export interface CyclePredictions {
  currentCycleDay: number;
  avgCycleLength: number;
  cycleProgress: number;
  nextPeriodDate: Date;
  daysUntilPeriod: number;
  ovulationDate: Date;
  fertileWindow: {
    start: Date;
    end: Date;
  };
}

@Injectable()
export class CyclesService {
  constructor(
    @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByUserId(userId: string): Promise<CycleDocument[]> {
    return this.cycleModel.find({ userId: new Types.ObjectId(userId) }).sort({ startDate: -1 }).exec();
  }

  async findActiveCycle(userId: string): Promise<CycleDocument | null> {
    return this.cycleModel.findOne({
      userId: new Types.ObjectId(userId),
      isActive: true
    }).exec();
  }

  async getCurrentCycle(userId: string): Promise<CycleDocument | null> {
    // First try to find active cycle
    let cycle = await this.findActiveCycle(userId);

    // If no active cycle, get the most recent one
    if (!cycle) {
      cycle = await this.cycleModel.findOne({
        userId: new Types.ObjectId(userId)
      }).sort({ startDate: -1 }).exec();
    }

    return cycle;
  }

  async create(cycleData: { userId: string; startDate: Date }): Promise<CycleDocument> {
    // Deactivate any existing active cycle
    await this.cycleModel.updateMany(
      { userId: new Types.ObjectId(cycleData.userId), isActive: true },
      { isActive: false },
    );

    const cycle = new this.cycleModel({
      userId: new Types.ObjectId(cycleData.userId),
      startDate: cycleData.startDate,
      isActive: true,
    });
    return cycle.save();
  }

  async update(id: string, cycleData: Partial<Cycle>): Promise<CycleDocument> {
    const cycle = await this.cycleModel.findByIdAndUpdate(id, cycleData, { new: true }).exec();
    if (!cycle) {
      throw new NotFoundException('Cycle not found');
    }
    return cycle;
  }

  async updatePregnancyTest(
    id: string,
    result: 'positive' | 'negative' | 'faint' | 'not_taken'
  ): Promise<CycleDocument> {
    const cycle = await this.cycleModel.findByIdAndUpdate(
      id,
      {
        pregnancyTestResult: {
          taken: result !== 'not_taken',
          result,
          date: new Date(),
        },
      },
      { new: true },
    ).exec();
    if (!cycle) {
      throw new NotFoundException('Cycle not found');
    }
    return cycle;
  }

  calculatePredictions(user: UserDocument, currentCycle: CycleDocument): CyclePredictions {
    const avgCycleLength = user.averageCycleLength || 28;
    const cycleStartDate = new Date(currentCycle.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate current cycle day
    const timeDiff = today.getTime() - cycleStartDate.getTime();
    const currentCycleDay = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    // Calculate next period date
    const nextPeriodDate = new Date(cycleStartDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + avgCycleLength);

    // Calculate days until next period
    const daysUntilPeriod = Math.max(0, Math.floor(
      (nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    ));

    // Calculate ovulation (typically cycle length - 14 days)
    const ovulationDay = avgCycleLength - 14;
    const ovulationDate = new Date(cycleStartDate);
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay - 1);

    // Fertile window (5 days before ovulation + ovulation day)
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

    // Cycle progress percentage
    const cycleProgress = Math.min(
      Math.round((currentCycleDay / avgCycleLength) * 100),
      100
    );

    return {
      currentCycleDay,
      avgCycleLength,
      cycleProgress,
      nextPeriodDate,
      daysUntilPeriod,
      ovulationDate,
      fertileWindow: {
        start: fertileWindowStart,
        end: ovulationDate,
      },
    };
  }

  async getPredictions(userId: string): Promise<CyclePredictions | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return null;

    const currentCycle = await this.getCurrentCycle(userId);
    if (!currentCycle) return null;

    return this.calculatePredictions(user, currentCycle);
  }
}
