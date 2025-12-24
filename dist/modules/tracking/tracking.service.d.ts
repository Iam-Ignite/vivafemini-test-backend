import { Model } from 'mongoose';
import { DailyLogDocument } from './daily-log.schema';
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
export declare class TrackingService {
    private dailyLogModel;
    constructor(dailyLogModel: Model<DailyLogDocument>);
    findByDate(userId: string, date: string): Promise<DailyLogDocument | null>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DailyLogDocument[]>;
    getCalendarData(userId: string, year: number, month: number): Promise<Record<string, DailyLogDocument>>;
    create(userId: string, data: CreateDailyLogDto): Promise<DailyLogDocument>;
    update(userId: string, date: string, data: Partial<CreateDailyLogDto>): Promise<DailyLogDocument>;
    delete(userId: string, date: string): Promise<void>;
    getRecentLogs(userId: string, limit?: number): Promise<DailyLogDocument[]>;
}
