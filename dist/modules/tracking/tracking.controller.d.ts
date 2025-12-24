import { TrackingService } from './tracking.service';
import type { CreateDailyLogDto } from './tracking.service';
import { UsersService } from '../users/users.service';
export declare class TrackingController {
    private readonly trackingService;
    private readonly usersService;
    constructor(trackingService: TrackingService, usersService: UsersService);
    getLogs(limit?: number): Promise<import("./daily-log.schema").DailyLogDocument[]>;
    getCalendarData(year: string, month: string): Promise<Record<string, import("./daily-log.schema").DailyLogDocument>>;
    getDayLog(date: string): Promise<import("./daily-log.schema").DailyLogDocument | null>;
    createDayLog(data: CreateDailyLogDto): Promise<import("./daily-log.schema").DailyLogDocument | {
        message: string;
    }>;
    updateDayLog(date: string, data: Partial<CreateDailyLogDto>): Promise<import("./daily-log.schema").DailyLogDocument | {
        message: string;
    }>;
    deleteDayLog(date: string): Promise<{
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
