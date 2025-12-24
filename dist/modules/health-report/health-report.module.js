"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthReportModule = void 0;
const common_1 = require("@nestjs/common");
const health_report_service_1 = require("./health-report.service");
const health_report_controller_1 = require("./health-report.controller");
const users_module_1 = require("../users/users.module");
const tracking_module_1 = require("../tracking/tracking.module");
const cycles_module_1 = require("../cycles/cycles.module");
let HealthReportModule = class HealthReportModule {
};
exports.HealthReportModule = HealthReportModule;
exports.HealthReportModule = HealthReportModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, tracking_module_1.TrackingModule, cycles_module_1.CyclesModule],
        controllers: [health_report_controller_1.HealthReportController],
        providers: [health_report_service_1.HealthReportService],
    })
], HealthReportModule);
//# sourceMappingURL=health-report.module.js.map