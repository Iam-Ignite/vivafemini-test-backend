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
exports.HealthReportController = void 0;
const common_1 = require("@nestjs/common");
const health_report_service_1 = require("./health-report.service");
const users_service_1 = require("../users/users.service");
let HealthReportController = class HealthReportController {
    healthReportService;
    usersService;
    constructor(healthReportService, usersService) {
        this.healthReportService = healthReportService;
        this.usersService = usersService;
    }
    async getCycleSummary() {
        const user = await this.usersService.getFirstUser();
        if (!user) {
            return {
                cycleLength: 28,
                periodDuration: 5,
                estimatedNextPeriod: 'Not available',
                ovulationWindow: 'Not available',
            };
        }
        return this.healthReportService.getCycleSummary(user._id.toString());
    }
    async getSymptomFrequency() {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { physicalPain: 0, moodMental: 0, digestionAppetite: 0, sexualHealth: 0 };
        return this.healthReportService.getSymptomFrequency(user._id.toString());
    }
    async getPeriodLengthData() {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return [];
        return this.healthReportService.getPeriodLengthData(user._id.toString());
    }
    async getHistoricalData(page, limit) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { data: [], total: 0, page: 1, totalPages: 0 };
        return this.healthReportService.getHistoricalData(user._id.toString(), parseInt(page || '1'), parseInt(limit || '10'));
    }
    async getTrends() {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { mostFrequentSymptom: 'None', symptomIntensityChange: 'stable' };
        return this.healthReportService.getTrends(user._id.toString());
    }
    async getFlowSymptomSummary() {
        const user = await this.usersService.getFirstUser();
        if (!user) {
            return {
                averageCycleLength: 28,
                description: 'Start tracking to see your personalized flow and symptom summary.',
                tips: [],
            };
        }
        return this.healthReportService.getFlowSymptomSummary(user._id.toString());
    }
};
exports.HealthReportController = HealthReportController;
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthReportController.prototype, "getCycleSummary", null);
__decorate([
    (0, common_1.Get)('symptom-frequency'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthReportController.prototype, "getSymptomFrequency", null);
__decorate([
    (0, common_1.Get)('period-length'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthReportController.prototype, "getPeriodLengthData", null);
__decorate([
    (0, common_1.Get)('historical'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HealthReportController.prototype, "getHistoricalData", null);
__decorate([
    (0, common_1.Get)('trends'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthReportController.prototype, "getTrends", null);
__decorate([
    (0, common_1.Get)('flow-summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthReportController.prototype, "getFlowSymptomSummary", null);
exports.HealthReportController = HealthReportController = __decorate([
    (0, common_1.Controller)('health-report'),
    __metadata("design:paramtypes", [health_report_service_1.HealthReportService,
        users_service_1.UsersService])
], HealthReportController);
//# sourceMappingURL=health-report.controller.js.map