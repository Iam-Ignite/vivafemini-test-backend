import { Model } from 'mongoose';
import { DailyLogDocument } from '../tracking/daily-log.schema';
import { CycleDocument } from '../cycles/cycle.schema';
import { UserDocument } from '../users/user.schema';
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
export declare class HealthReportService {
    private dailyLogModel;
    private cycleModel;
    private userModel;
    constructor(dailyLogModel: Model<DailyLogDocument>, cycleModel: Model<CycleDocument>, userModel: Model<UserDocument>);
    getCycleSummary(userId: string): Promise<CycleSummary>;
    getSymptomFrequency(userId: string): Promise<SymptomFrequency>;
    getPeriodLengthData(userId: string): Promise<{
        date: string;
        flowIntensity: number;
    }[]>;
    getHistoricalData(userId: string, page?: number, limit?: number): Promise<{
        data: {
            date: string;
            time: string;
            topSymptom: string;
            totalSymptoms: number;
            note: string;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getTrends(userId: string): Promise<{
        mostFrequentSymptom: string;
        symptomIntensityChange: "stable";
    }>;
    getFlowSymptomSummary(userId: string): Promise<{
        averageCycleLength: number;
        description: string;
        tips: string[];
    }>;
}
