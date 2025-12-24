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
exports.HealthReportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const daily_log_schema_1 = require("../tracking/daily-log.schema");
const cycle_schema_1 = require("../cycles/cycle.schema");
const user_schema_1 = require("../users/user.schema");
let HealthReportService = class HealthReportService {
    dailyLogModel;
    cycleModel;
    userModel;
    constructor(dailyLogModel, cycleModel, userModel) {
        this.dailyLogModel = dailyLogModel;
        this.cycleModel = cycleModel;
        this.userModel = userModel;
    }
    async getCycleSummary(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            return {
                cycleLength: 28,
                periodDuration: 5,
                estimatedNextPeriod: 'Not available',
                ovulationWindow: 'Not available',
            };
        }
        const currentCycle = await this.cycleModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
        }).sort({ startDate: -1 }).exec();
        if (!currentCycle) {
            return {
                cycleLength: user.averageCycleLength || 28,
                periodDuration: user.averagePeriodLength || 5,
                estimatedNextPeriod: 'Start tracking to see predictions',
                ovulationWindow: 'Start tracking to see predictions',
            };
        }
        const cycleLength = user.averageCycleLength || 28;
        const periodDuration = user.averagePeriodLength || 5;
        const nextPeriodDate = new Date(currentCycle.startDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
        const ovulationDay = cycleLength - 14;
        const ovulationStart = new Date(currentCycle.startDate);
        ovulationStart.setDate(ovulationStart.getDate() + ovulationDay - 3);
        const ovulationEnd = new Date(currentCycle.startDate);
        ovulationEnd.setDate(ovulationEnd.getDate() + ovulationDay + 1);
        return {
            cycleLength,
            periodDuration,
            estimatedNextPeriod: nextPeriodDate.toISOString().split('T')[0],
            ovulationWindow: `${ovulationStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${ovulationEnd.toLocaleDateString('en-US', { day: 'numeric' })}`,
        };
    }
    async getSymptomFrequency(userId) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const logs = await this.dailyLogModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: thirtyDaysAgo },
        }).exec();
        if (logs.length === 0) {
            return { physicalPain: 0, moodMental: 0, digestionAppetite: 0, sexualHealth: 0 };
        }
        const totalDays = logs.length;
        const physicalPainDays = logs.filter(l => l.physicalPain.length > 0).length;
        const moodMentalDays = logs.filter(l => l.moodMental.length > 0).length;
        const digestionDays = logs.filter(l => l.physicalPain.includes('diarrhea') ||
            l.physicalPain.includes('nausea') ||
            l.physicalPain.includes('appetite_changes')).length;
        const sexualHealthDays = logs.filter(l => l.sexualHealth.length > 0).length;
        return {
            physicalPain: Math.round((physicalPainDays / totalDays) * 100),
            moodMental: Math.round((moodMentalDays / totalDays) * 100),
            digestionAppetite: Math.round((digestionDays / totalDays) * 100),
            sexualHealth: Math.round((sexualHealthDays / totalDays) * 100),
        };
    }
    async getPeriodLengthData(userId) {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        const logs = await this.dailyLogModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: ninetyDaysAgo },
            $or: [
                { isPeriodDay: true },
                { flowIntensity: { $gt: 0 } },
            ],
        }).sort({ date: 1 }).exec();
        return logs.map(log => ({
            date: log.date.toISOString().split('T')[0],
            flowIntensity: log.flowIntensity,
        }));
    }
    async getHistoricalData(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const logs = await this.dailyLogModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
        }).sort({ date: -1 }).skip(skip).limit(limit).exec();
        const total = await this.dailyLogModel.countDocuments({
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        const data = logs.map(log => {
            const allSymptoms = [
                ...log.physicalPain,
                ...log.moodMental,
                ...log.sexualHealth,
                ...log.periodIndicators,
            ];
            const topSymptom = allSymptoms.length > 0 ? allSymptoms[0].replace(/_/g, ' ') : 'None';
            return {
                date: log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                time: log.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                topSymptom: topSymptom.charAt(0).toUpperCase() + topSymptom.slice(1),
                totalSymptoms: allSymptoms.length,
                note: log.notes || '',
            };
        });
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getTrends(userId) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const logs = await this.dailyLogModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: thirtyDaysAgo },
        }).exec();
        const symptomCounts = {};
        logs.forEach(log => {
            [...log.physicalPain, ...log.moodMental].forEach(symptom => {
                symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
            });
        });
        let mostFrequent = 'None';
        let maxCount = 0;
        Object.entries(symptomCounts).forEach(([symptom, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostFrequent = symptom.replace(/_/g, ' ');
                mostFrequent = mostFrequent.charAt(0).toUpperCase() + mostFrequent.slice(1);
            }
        });
        return {
            mostFrequentSymptom: mostFrequent,
            symptomIntensityChange: 'stable',
        };
    }
    async getFlowSymptomSummary(userId) {
        const user = await this.userModel.findById(userId).exec();
        return {
            averageCycleLength: user?.averageCycleLength || 28,
            description: 'Your average cycle length is 29 days. PMS symptoms were more frequent this month. Flow pattern remains within a typical range',
            tips: [
                'Low sleep nights → higher cramp scores',
                'Low hydration → increased bloating',
            ],
        };
    }
};
exports.HealthReportService = HealthReportService;
exports.HealthReportService = HealthReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(daily_log_schema_1.DailyLog.name)),
    __param(1, (0, mongoose_1.InjectModel)(cycle_schema_1.Cycle.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], HealthReportService);
//# sourceMappingURL=health-report.service.js.map