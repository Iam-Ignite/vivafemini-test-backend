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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLogSchema = exports.DailyLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DailyLog = class DailyLog {
    userId;
    cycleId;
    date;
    periodIndicators;
    sexualHealth;
    physicalPain;
    moodMental;
    flowIntensity;
    notes;
    isPeriodDay;
};
exports.DailyLog = DailyLog;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DailyLog.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Cycle' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DailyLog.prototype, "cycleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], DailyLog.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DailyLog.prototype, "periodIndicators", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DailyLog.prototype, "sexualHealth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DailyLog.prototype, "physicalPain", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DailyLog.prototype, "moodMental", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, max: 10, default: 0 }),
    __metadata("design:type", Number)
], DailyLog.prototype, "flowIntensity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DailyLog.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], DailyLog.prototype, "isPeriodDay", void 0);
exports.DailyLog = DailyLog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DailyLog);
exports.DailyLogSchema = mongoose_1.SchemaFactory.createForClass(DailyLog);
exports.DailyLogSchema.index({ userId: 1, date: -1 });
exports.DailyLogSchema.index({ cycleId: 1 });
//# sourceMappingURL=daily-log.schema.js.map