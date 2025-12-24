import { CyclesService } from './cycles.service';
import { UsersService } from '../users/users.service';
export declare class CyclesController {
    private readonly cyclesService;
    private readonly usersService;
    constructor(cyclesService: CyclesService, usersService: UsersService);
    getAllCycles(): Promise<import("./cycle.schema").CycleDocument[]>;
    getCurrentCycle(): Promise<{
        cycle: import("./cycle.schema").CycleDocument;
        predictions: import("./cycles.service").CyclePredictions;
    } | null>;
    getPredictions(): Promise<import("./cycles.service").CyclePredictions | null>;
    startNewCycle(startDate: string): Promise<import("./cycle.schema").CycleDocument | {
        message: string;
    }>;
    updateCycle(id: string, updateData: any): Promise<import("./cycle.schema").CycleDocument>;
    updatePregnancyTest(id: string, result: 'positive' | 'negative' | 'faint' | 'not_taken'): Promise<import("./cycle.schema").CycleDocument>;
}
