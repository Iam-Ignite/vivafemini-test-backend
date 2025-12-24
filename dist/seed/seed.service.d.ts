import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../modules/users/user.schema';
import { CycleDocument } from '../modules/cycles/cycle.schema';
import { DailyLogDocument } from '../modules/tracking/daily-log.schema';
import { ArticleDocument } from '../modules/articles/article.schema';
import { TipDocument } from '../modules/tips/tip.schema';
export declare class SeedService implements OnModuleInit {
    private userModel;
    private cycleModel;
    private dailyLogModel;
    private articleModel;
    private tipModel;
    constructor(userModel: Model<UserDocument>, cycleModel: Model<CycleDocument>, dailyLogModel: Model<DailyLogDocument>, articleModel: Model<ArticleDocument>, tipModel: Model<TipDocument>);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
