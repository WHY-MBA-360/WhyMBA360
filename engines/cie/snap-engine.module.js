"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SnapEngineModule = void 0;
var common_1 = require("@nestjs/common");
var snap_engine_service_1 = require("./snap-engine.service");
var SnapEngineModule = /** @class */ (function () {
    function SnapEngineModule() {
    }
    SnapEngineModule = __decorate([
        (0, common_1.Module)({
            providers: [snap_engine_service_1.SnapEngineService],
            exports: [snap_engine_service_1.SnapEngineService]
        })
    ], SnapEngineModule);
    return SnapEngineModule;
}());
exports.SnapEngineModule = SnapEngineModule;
