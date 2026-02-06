"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var bullmq_1 = require("@nestjs/bullmq");
var schedule_1 = require("@nestjs/schedule");
var cat_engine_module_1 = require("./exam-engines/cat-engine/cat-engine.module");
var xat_engine_module_1 = require("./exam-engines/xat-engine/xat-engine.module");
var nmat_engine_module_1 = require("./exam-engines/nmat-engine/nmat-engine.module");
var snap_engine_module_1 = require("./exam-engines/snap-engine/snap-engine.module");
var profile_engine_module_1 = require("./exam-engines/profile-engine/profile-engine.module");
var portfolio_optimizer_module_1 = require("./portfolio-optimizer/portfolio-optimizer.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        host: configService.get('DB_HOST', 'localhost'),
                        port: configService.get('DB_PORT', 5432),
                        username: configService.get('DB_USERNAME', 'admin'),
                        password: configService.get('DB_PASSWORD', 'secure_password'),
                        database: configService.get('DB_DATABASE', 'why_mba_cie'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: configService.get('NODE_ENV') !== 'production',
                        logging: configService.get('NODE_ENV') === 'development'
                    }); },
                    inject: [config_1.ConfigService]
                }),
                bullmq_1.BullModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return ({
                        connection: {
                            host: configService.get('REDIS_HOST', 'localhost'),
                            port: configService.get('REDIS_PORT', 6379)
                        }
                    }); },
                    inject: [config_1.ConfigService]
                }),
                schedule_1.ScheduleModule.forRoot(),
                cat_engine_module_1.CatEngineModule,
                xat_engine_module_1.XatEngineModule,
                nmat_engine_module_1.NmatEngineModule,
                snap_engine_module_1.SnapEngineModule,
                profile_engine_module_1.ProfileEngineModule,
                portfolio_optimizer_module_1.PortfolioOptimizerModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
