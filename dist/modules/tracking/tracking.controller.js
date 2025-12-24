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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const tracking_service_1 = require("./tracking.service");
const users_service_1 = require("../users/users.service");
let TrackingController = class TrackingController {
    trackingService;
    usersService;
    constructor(trackingService, usersService) {
        this.trackingService = trackingService;
        this.usersService = usersService;
    }
    async getLogs(limit) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return [];
        return this.trackingService.getRecentLogs(user._id.toString(), limit || 30);
    }
    async getCalendarData(year, month) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return {};
        return this.trackingService.getCalendarData(user._id.toString(), parseInt(year), parseInt(month));
    }
    async getDayLog(date) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return null;
        return this.trackingService.findByDate(user._id.toString(), date);
    }
    async createDayLog(data) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { message: 'No user found' };
        return this.trackingService.create(user._id.toString(), data);
    }
    async updateDayLog(date, data) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { message: 'No user found' };
        return this.trackingService.update(user._id.toString(), date, data);
    }
    async deleteDayLog(date) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { message: 'No user found' };
        await this.trackingService.delete(user._id.toString(), date);
        return { success: true };
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('calendar/:year/:month'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getCalendarData", null);
__decorate([
    (0, common_1.Get)(':date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getDayLog", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "createDayLog", null);
__decorate([
    (0, common_1.Patch)(':date'),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "updateDayLog", null);
__decorate([
    (0, common_1.Delete)(':date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "deleteDayLog", null);
exports.TrackingController = TrackingController = __decorate([
    (0, common_1.Controller)('tracking'),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService,
        users_service_1.UsersService])
], TrackingController);
//# sourceMappingURL=tracking.controller.js.map