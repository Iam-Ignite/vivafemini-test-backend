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
exports.TipsController = void 0;
const common_1 = require("@nestjs/common");
const tips_service_1 = require("./tips.service");
let TipsController = class TipsController {
    tipsService;
    constructor(tipsService) {
        this.tipsService = tipsService;
    }
    async getTips(cycleDay) {
        if (cycleDay) {
            return this.tipsService.findByCycleDay(parseInt(cycleDay));
        }
        return this.tipsService.findAll();
    }
    async getTipsByDay(dayNumber) {
        return this.tipsService.findByCycleDay(parseInt(dayNumber));
    }
};
exports.TipsController = TipsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('cycleDay')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TipsController.prototype, "getTips", null);
__decorate([
    (0, common_1.Get)('day/:dayNumber'),
    __param(0, (0, common_1.Param)('dayNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TipsController.prototype, "getTipsByDay", null);
exports.TipsController = TipsController = __decorate([
    (0, common_1.Controller)('tips'),
    __metadata("design:paramtypes", [tips_service_1.TipsService])
], TipsController);
//# sourceMappingURL=tips.controller.js.map