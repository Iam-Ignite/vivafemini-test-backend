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
exports.CyclesController = void 0;
const common_1 = require("@nestjs/common");
const cycles_service_1 = require("./cycles.service");
const users_service_1 = require("../users/users.service");
let CyclesController = class CyclesController {
    cyclesService;
    usersService;
    constructor(cyclesService, usersService) {
        this.cyclesService = cyclesService;
        this.usersService = usersService;
    }
    async getAllCycles() {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return [];
        return this.cyclesService.findByUserId(user._id.toString());
    }
    async getCurrentCycle() {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return null;
        const cycle = await this.cyclesService.getCurrentCycle(user._id.toString());
        if (!cycle)
            return null;
        const predictions = this.cyclesService.calculatePredictions(user, cycle);
        return {
            cycle,
            predictions,
        };
    }
    async getPredictions() {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return null;
        return this.cyclesService.getPredictions(user._id.toString());
    }
    async startNewCycle(startDate) {
        const user = await this.usersService.getFirstUser();
        if (!user)
            return { message: 'No user found' };
        return this.cyclesService.create({
            userId: user._id.toString(),
            startDate: new Date(startDate),
        });
    }
    async updateCycle(id, updateData) {
        return this.cyclesService.update(id, updateData);
    }
    async updatePregnancyTest(id, result) {
        return this.cyclesService.updatePregnancyTest(id, result);
    }
};
exports.CyclesController = CyclesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CyclesController.prototype, "getAllCycles", null);
__decorate([
    (0, common_1.Get)('current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CyclesController.prototype, "getCurrentCycle", null);
__decorate([
    (0, common_1.Get)('predictions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CyclesController.prototype, "getPredictions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CyclesController.prototype, "startNewCycle", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CyclesController.prototype, "updateCycle", null);
__decorate([
    (0, common_1.Patch)(':id/pregnancy-test'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('result')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CyclesController.prototype, "updatePregnancyTest", null);
exports.CyclesController = CyclesController = __decorate([
    (0, common_1.Controller)('cycles'),
    __metadata("design:paramtypes", [cycles_service_1.CyclesService,
        users_service_1.UsersService])
], CyclesController);
//# sourceMappingURL=cycles.controller.js.map