import { TipsService } from './tips.service';
export declare class TipsController {
    private readonly tipsService;
    constructor(tipsService: TipsService);
    getTips(cycleDay?: string): Promise<import("./tip.schema").TipDocument[]>;
    getTipsByDay(dayNumber: string): Promise<import("./tip.schema").TipDocument[]>;
}
