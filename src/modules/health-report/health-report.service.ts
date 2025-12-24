import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DailyLog, DailyLogDocument } from '../tracking/daily-log.schema';
import { Cycle, CycleDocument } from '../cycles/cycle.schema';
import { User, UserDocument } from '../users/user.schema';

export interface CycleSummary {
  cycleLength: number;
  periodDuration: number;
  estimatedNextPeriod: string;
  ovulationWindow: string;
}

export interface SymptomFrequency {
  physicalPain: number;
  moodMental: number;
  digestionAppetite: number;
  sexualHealth: number;
}

@Injectable()
export class HealthReportService {
  constructor(
    @InjectModel(DailyLog.name) private dailyLogModel: Model<DailyLogDocument>,
    @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getCycleSummary(userId: string): Promise<CycleSummary> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      return {
        cycleLength: 28,
        periodDuration: 5,
        estimatedNextPeriod: 'Not available',
        ovulationWindow: 'Not available',
      };
    }

    const currentCycle = await this.cycleModel.findOne({
      userId: new Types.ObjectId(userId),
    }).sort({ startDate: -1 }).exec();

    if (!currentCycle) {
      return {
        cycleLength: user.averageCycleLength || 28,
        periodDuration: user.averagePeriodLength || 5,
        estimatedNextPeriod: 'Start tracking to see predictions',
        ovulationWindow: 'Start tracking to see predictions',
      };
    }

    const cycleLength = user.averageCycleLength || 28;
    const periodDuration = user.averagePeriodLength || 5;

    const nextPeriodDate = new Date(currentCycle.startDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    const ovulationDay = cycleLength - 14;
    const ovulationStart = new Date(currentCycle.startDate);
    ovulationStart.setDate(ovulationStart.getDate() + ovulationDay - 3);
    const ovulationEnd = new Date(currentCycle.startDate);
    ovulationEnd.setDate(ovulationEnd.getDate() + ovulationDay + 1);

    return {
      cycleLength,
      periodDuration,
      estimatedNextPeriod: nextPeriodDate.toISOString().split('T')[0],
      ovulationWindow: `${ovulationStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${ovulationEnd.toLocaleDateString('en-US', { day: 'numeric' })}`,
    };
  }

  async getSymptomFrequency(userId: string): Promise<SymptomFrequency> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await this.dailyLogModel.find({
      userId: new Types.ObjectId(userId),
      date: { $gte: thirtyDaysAgo },
    }).exec();

    if (logs.length === 0) {
      return { physicalPain: 0, moodMental: 0, digestionAppetite: 0, sexualHealth: 0 };
    }

    const totalDays = logs.length;
    const physicalPainDays = logs.filter(l => l.physicalPain.length > 0).length;
    const moodMentalDays = logs.filter(l => l.moodMental.length > 0).length;
    const digestionDays = logs.filter(l =>
      l.physicalPain.includes('diarrhea') ||
      l.physicalPain.includes('nausea') ||
      l.physicalPain.includes('appetite_changes')
    ).length;
    const sexualHealthDays = logs.filter(l => l.sexualHealth.length > 0).length;

    return {
      physicalPain: Math.round((physicalPainDays / totalDays) * 100),
      moodMental: Math.round((moodMentalDays / totalDays) * 100),
      digestionAppetite: Math.round((digestionDays / totalDays) * 100),
      sexualHealth: Math.round((sexualHealthDays / totalDays) * 100),
    };
  }

  async getPeriodLengthData(userId: string) {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const logs = await this.dailyLogModel.find({
      userId: new Types.ObjectId(userId),
      date: { $gte: ninetyDaysAgo },
      $or: [
        { isPeriodDay: true },
        { flowIntensity: { $gt: 0 } },
      ],
    }).sort({ date: 1 }).exec();

    return logs.map(log => ({
      date: log.date.toISOString().split('T')[0],
      flowIntensity: log.flowIntensity,
    }));
  }

  async getHistoricalData(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const logs = await this.dailyLogModel.find({
      userId: new Types.ObjectId(userId),
    }).sort({ date: -1 }).skip(skip).limit(limit).exec();

    const total = await this.dailyLogModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });

    const data = logs.map(log => {
      const allSymptoms = [
        ...log.physicalPain,
        ...log.moodMental,
        ...log.sexualHealth,
        ...log.periodIndicators,
      ];
      const topSymptom = allSymptoms.length > 0 ? allSymptoms[0].replace(/_/g, ' ') : 'None';

      return {
        date: log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: log.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        topSymptom: topSymptom.charAt(0).toUpperCase() + topSymptom.slice(1),
        totalSymptoms: allSymptoms.length,
        note: log.notes || '',
      };
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTrends(userId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await this.dailyLogModel.find({
      userId: new Types.ObjectId(userId),
      date: { $gte: thirtyDaysAgo },
    }).exec();

    // Count all symptoms
    const symptomCounts: Record<string, number> = {};
    logs.forEach(log => {
      [...log.physicalPain, ...log.moodMental].forEach(symptom => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    // Find most frequent
    let mostFrequent = 'None';
    let maxCount = 0;
    Object.entries(symptomCounts).forEach(([symptom, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = symptom.replace(/_/g, ' ');
        mostFrequent = mostFrequent.charAt(0).toUpperCase() + mostFrequent.slice(1);
      }
    });

    return {
      mostFrequentSymptom: mostFrequent,
      symptomIntensityChange: 'stable' as const,
    };
  }

  async getFlowSymptomSummary(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    return {
      averageCycleLength: user?.averageCycleLength || 28,
      description: 'Your average cycle length is 29 days. PMS symptoms were more frequent this month. Flow pattern remains within a typical range',
      tips: [
        'Low sleep nights → higher cramp scores',
        'Low hydration → increased bloating',
      ],
    };
  }
}
