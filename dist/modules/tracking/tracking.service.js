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
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const daily_log_schema_1 = require("./daily-log.schema");
const date_fns_1 = require("date-fns");
let TrackingService = class TrackingService {
    dailyLogModel;
    constructor(dailyLogModel) {
        this.dailyLogModel = dailyLogModel;
    }
    async findByDate(userId, date) {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return this.dailyLogModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: targetDate, $lt: nextDay },
        }).exec();
    }
    async findByDateRange(userId, startDate, endDate) {
        return this.dailyLogModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: startDate, $lte: endDate },
        }).sort({ date: -1 }).exec();
    }
    async getCalendarData(userId, year, month) {
        const start = (0, date_fns_1.startOfMonth)(new Date(year, month - 1));
        const end = (0, date_fns_1.endOfMonth)(new Date(year, month - 1));
        const logs = await this.findByDateRange(userId, start, end);
        const logsByDate = {};
        logs.forEach(log => {
            const dateKey = (0, date_fns_1.format)(log.date, 'yyyy-MM-dd');
            logsByDate[dateKey] = log;
        });
        return logsByDate;
    }
    async create(userId, data) {
        const existingLog = await this.findByDate(userId, data.date);
        if (existingLog) {
            return this.update(userId, data.date, data);
        }
        const dailyLog = new this.dailyLogModel({
            ...data,
            userId: new mongoose_2.Types.ObjectId(userId),
            date: new Date(data.date),
        });
        return dailyLog.save();
    }
    async update(userId, date, data) {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const log = await this.dailyLogModel.findOneAndUpdate({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: targetDate, $lt: nextDay },
        }, { ...data, date: targetDate }, { new: true, upsert: true }).exec();
        return log;
    }
    async delete(userId, date) {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);
        await this.dailyLogModel.deleteOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            date: { $gte: targetDate, $lt: nextDay },
        }).exec();
    }
    async getRecentLogs(userId, limit = 30) {
        return this.dailyLogModel.find({
            userId: new mongoose_2.Types.ObjectId(userId),
        }).sort({ date: -1 }).limit(limit).exec();
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(daily_log_schema_1.DailyLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TrackingService);
//# sourceMappingURL=tracking.service.js.map