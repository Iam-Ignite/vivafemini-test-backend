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
exports.TipsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tip_schema_1 = require("./tip.schema");
let TipsService = class TipsService {
    tipModel;
    constructor(tipModel) {
        this.tipModel = tipModel;
    }
    async findAll() {
        return this.tipModel.find().exec();
    }
    async findByCycleDay(cycleDay) {
        return this.tipModel.find({
            cycleDays: cycleDay,
        }).exec();
    }
    async findByCategory(category) {
        return this.tipModel.find({ category }).exec();
    }
    async create(tipData) {
        const tip = new this.tipModel(tipData);
        return tip.save();
    }
};
exports.TipsService = TipsService;
exports.TipsService = TipsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tip_schema_1.Tip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TipsService);
//# sourceMappingURL=tips.service.js.map