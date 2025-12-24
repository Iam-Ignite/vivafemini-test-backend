import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DailyLog, DailyLogDocument } from './daily-log.schema';
import { startOfMonth, endOfMonth, format } from 'date-fns';

export interface CreateDailyLogDto {
  date: string;
  periodIndicators?: string[];
  sexualHealth?: string[];
  physicalPain?: string[];
  moodMental?: string[];
  flowIntensity?: number;
  notes?: string;
  isPeriodDay?: boolean;
}

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(DailyLog.name) private dailyLogModel: Model<DailyLogDocument>,
  ) {}

  async findByDate(userId: string, date: string): Promise<DailyLogDocument | null> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    return this.dailyLogModel.findOne({
      userId: new Types.ObjectId(userId),
      date: { $gte: targetDate, $lt: nextDay },
    }).exec();
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DailyLogDocument[]> {
    return this.dailyLogModel.find({
      userId: new Types.ObjectId(userId),
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 }).exec();
  }

  async getCalendarData(userId: string, year: number, month: number) {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));

    const logs = await this.findByDateRange(userId, start, end);

    const logsByDate: Record<string, DailyLogDocument> = {};
    logs.forEach(log => {
      const dateKey = format(log.date, 'yyyy-MM-dd');
      logsByDate[dateKey] = log;
    });

    return logsByDate;
  }

  async create(userId: string, data: CreateDailyLogDto): Promise<DailyLogDocument> {
    const existingLog = await this.findByDate(userId, data.date);
    if (existingLog) {
      return this.update(userId, data.date, data);
    }

    const dailyLog = new this.dailyLogModel({
      ...data,
      userId: new Types.ObjectId(userId),
      date: new Date(data.date),
    });
    return dailyLog.save();
  }

  async update(userId: string, date: string, data: Partial<CreateDailyLogDto>): Promise<DailyLogDocument> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const log = await this.dailyLogModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        date: { $gte: targetDate, $lt: nextDay },
      },
      { ...data, date: targetDate },
      { new: true, upsert: true },
    ).exec();

    return log;
  }

  async delete(userId: string, date: string): Promise<void> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    await this.dailyLogModel.deleteOne({
      userId: new Types.ObjectId(userId),
      date: { $gte: targetDate, $lt: nextDay },
    }).exec();
  }

  async getRecentLogs(userId: string, limit: number = 30): Promise<DailyLogDocument[]> {
    return this.dailyLogModel.find({
      userId: new Types.ObjectId(userId),
    }).sort({ date: -1 }).limit(limit).exec();
  }
}
