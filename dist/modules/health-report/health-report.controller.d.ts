import { HealthReportService } from './health-report.service';
import { UsersService } from '../users/users.service';
export declare class HealthReportController {
    private readonly healthReportService;
    private readonly usersService;
    constructor(healthReportService: HealthReportService, usersService: UsersService);
    getCycleSummary(): Promise<{
        cycleLength: number;
        periodDuration: number;
        estimatedNextPeriod: string;
        ovulationWindow: string;
    }>;
    getSymptomFrequency(): Promise<{
        physicalPain: number;
        moodMental: number;
        digestionAppetite: number;
        sexualHealth: number;
    }>;
    getPeriodLengthData(): Promise<{
        date: string;
        flowIntensity: number;
    }[]>;
    getHistoricalData(page?: string, limit?: string): Promise<{
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
    getTrends(): Promise<{
        mostFrequentSymptom: string;
        symptomIntensityChange: string;
    }>;
    getFlowSymptomSummary(): Promise<{
        averageCycleLength: number;
        description: string;
        tips: string[];
    }>;
}
