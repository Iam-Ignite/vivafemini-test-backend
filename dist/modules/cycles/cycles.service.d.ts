import { Model } from 'mongoose';
import { Cycle, CycleDocument } from './cycle.schema';
import { UserDocument } from '../users/user.schema';
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
export declare class CyclesService {
    private cycleModel;
    private userModel;
    constructor(cycleModel: Model<CycleDocument>, userModel: Model<UserDocument>);
    findByUserId(userId: string): Promise<CycleDocument[]>;
    findActiveCycle(userId: string): Promise<CycleDocument | null>;
    getCurrentCycle(userId: string): Promise<CycleDocument | null>;
    create(cycleData: {
        userId: string;
        startDate: Date;
    }): Promise<CycleDocument>;
    update(id: string, cycleData: Partial<Cycle>): Promise<CycleDocument>;
    updatePregnancyTest(id: string, result: 'positive' | 'negative' | 'faint' | 'not_taken'): Promise<CycleDocument>;
    calculatePredictions(user: UserDocument, currentCycle: CycleDocument): CyclePredictions;
    getPredictions(userId: string): Promise<CyclePredictions | null>;
}
