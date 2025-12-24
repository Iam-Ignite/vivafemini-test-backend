import { Model } from 'mongoose';
import { Tip, TipDocument } from './tip.schema';
export declare class TipsService {
    private tipModel;
    constructor(tipModel: Model<TipDocument>);
    findAll(): Promise<TipDocument[]>;
    findByCycleDay(cycleDay: number): Promise<TipDocument[]>;
    findByCategory(category: string): Promise<TipDocument[]>;
    create(tipData: Partial<Tip>): Promise<TipDocument>;
}
