"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const daily_log_schema_1 = require("./daily-log.schema");
const tracking_service_1 = require("./tracking.service");
const tracking_controller_1 = require("./tracking.controller");
const users_module_1 = require("../users/users.module");
let TrackingModule = class TrackingModule {
};
exports.TrackingModule = TrackingModule;
exports.TrackingModule = TrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: daily_log_schema_1.DailyLog.name, schema: daily_log_schema_1.DailyLogSchema }]),
            users_module_1.UsersModule,
        ],
        controllers: [tracking_controller_1.TrackingController],
        providers: [tracking_service_1.TrackingService],
        exports: [tracking_service_1.TrackingService, mongoose_1.MongooseModule],
    })
], TrackingModule);
//# sourceMappingURL=tracking.module.js.map