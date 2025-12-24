"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cycle_schema_1 = require("./cycle.schema");
const user_schema_1 = require("../users/user.schema");
let CyclesService = class CyclesService {
    cycleModel;
    userModel;
    constructor(cycleModel, userModel) {
        this.cycleModel = cycleModel;
        this.userModel = userModel;
    }
    async findByUserId(userId) {
        return this.cycleModel.find({ userId: new mongoose_2.Types.ObjectId(userId) }).sort({ startDate: -1 }).exec();
    }
    async findActiveCycle(userId) {
        return this.cycleModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            isActive: true
        }).exec();
    }
    async getCurrentCycle(userId) {
        let cycle = await this.findActiveCycle(userId);
        if (!cycle) {
            cycle = await this.cycleModel.findOne({
                userId: new mongoose_2.Types.ObjectId(userId)
            }).sort({ startDate: -1 }).exec();
        }
        return cycle;
    }
    async create(cycleData) {
        await this.cycleModel.updateMany({ userId: new mongoose_2.Types.ObjectId(cycleData.userId), isActive: true }, { isActive: false });
        const cycle = new this.cycleModel({
            userId: new mongoose_2.Types.ObjectId(cycleData.userId),
            startDate: cycleData.startDate,
            isActive: true,
        });
        return cycle.save();
    }
    async update(id, cycleData) {
        const cycle = await this.cycleModel.findByIdAndUpdate(id, cycleData, { new: true }).exec();
        if (!cycle) {
            throw new common_1.NotFoundException('Cycle not found');
        }
        return cycle;
    }
    async updatePregnancyTest(id, result) {
        const cycle = await this.cycleModel.findByIdAndUpdate(id, {
            pregnancyTestResult: {
                taken: result !== 'not_taken',
                result,
                date: new Date(),
            },
        }, { new: true }).exec();
        if (!cycle) {
            throw new common_1.NotFoundException('Cycle not found');
        }
        return cycle;
    }
    calculatePredictions(user, currentCycle) {
        const avgCycleLength = user.averageCycleLength || 28;
        const cycleStartDate = new Date(currentCycle.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const timeDiff = today.getTime() - cycleStartDate.getTime();
        const currentCycleDay = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        const nextPeriodDate = new Date(cycleStartDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + avgCycleLength);
        const daysUntilPeriod = Math.max(0, Math.floor((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        const ovulationDay = avgCycleLength - 14;
        const ovulationDate = new Date(cycleStartDate);
        ovulationDate.setDate(ovulationDate.getDate() + ovulationDay - 1);
        const fertileWindowStart = new Date(ovulationDate);
        fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);
        const cycleProgress = Math.min(Math.round((currentCycleDay / avgCycleLength) * 100), 100);
        return {
            currentCycleDay,
            avgCycleLength,
            cycleProgress,
            nextPeriodDate,
            daysUntilPeriod,
            ovulationDate,
            fertileWindow: {
                start: fertileWindowStart,
                end: ovulationDate,
            },
        };
    }
    async getPredictions(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user)
            return null;
        const currentCycle = await this.getCurrentCycle(userId);
        if (!currentCycle)
            return null;
        return this.calculatePredictions(user, currentCycle);
    }
};
exports.CyclesService = CyclesService;
exports.CyclesService = CyclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cycle_schema_1.Cycle.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CyclesService);
//# sourceMappingURL=cycles.service.js.map