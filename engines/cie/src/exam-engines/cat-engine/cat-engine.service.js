"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CatEngineService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var iim_admission_model_entity_1 = require("../../database/entities/iim-admission-model.entity");
var historical_cutoff_entity_1 = require("../../database/entities/historical-cutoff.entity");
var CatEngineService = /** @class */ (function () {
    function CatEngineService(iimModelRepo, cutoffRepo) {
        this.iimModelRepo = iimModelRepo;
        this.cutoffRepo = cutoffRepo;
        this.logger = new common_1.Logger(CatEngineService_1.name);
    }
    CatEngineService_1 = CatEngineService;
    CatEngineService.prototype.predictIIMCalls = function (userProfile, catScore) {
        return __awaiter(this, void 0, void 0, function () {
            var iimModels, results, _i, iimModels_1, model, compositeScore, cutoff, classification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.iimModelRepo.find({
                            where: { year: new Date().getFullYear() }
                        })];
                    case 1:
                        iimModels = _a.sent();
                        results = [];
                        _i = 0, iimModels_1 = iimModels;
                        _a.label = 2;
                    case 2:
                        if (!(_i < iimModels_1.length)) return [3 /*break*/, 5];
                        model = iimModels_1[_i];
                        compositeScore = this.calculateCompositeScore(userProfile, catScore, model);
                        return [4 /*yield*/, this.cutoffRepo.findOne({
                                where: {
                                    iimId: model.id,
                                    year: new Date().getFullYear() - 1,
                                    category: userProfile.category
                                }
                            })];
                    case 3:
                        cutoff = _a.sent();
                        classification = this.classifyChance(compositeScore, cutoff === null || cutoff === void 0 ? void 0 : cutoff.compositeCutoff);
                        results.push({
                            iimName: model.iimName,
                            category: userProfile.category,
                            predictedCompositeScore: compositeScore,
                            historicalCutoff: cutoff === null || cutoff === void 0 ? void 0 : cutoff.compositeCutoff,
                            confidenceBand: this.calculateConfidenceBand(model.dataSource),
                            classification: classification,
                            reasoning: this.generateReasoning(compositeScore, cutoff, classification)
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, results];
                }
            });
        });
    };
    CatEngineService.prototype.calculateCompositeScore = function (userProfile, catScore, model) {
        var weights = model.stage1Weights;
        var normalizedCAT = this.normalizeCATPercentile(catScore.overallPercentile);
        var academicIndex = this.calculateAcademicIndex(userProfile.academicScores, model.normalizationRules);
        var workExScore = this.normalizeWorkExperience(userProfile.workExMonths);
        return (normalizedCAT * weights.cat) +
            (academicIndex * weights.academics) +
            (workExScore * weights.workex) +
            (userProfile.genderFactor * weights.gender) +
            (userProfile.diversityFactor * weights.diversity);
    };
    CatEngineService.prototype.normalizeCATPercentile = function (percentile) {
        return percentile;
    };
    CatEngineService.prototype.calculateAcademicIndex = function (academicScores, normalizationRules) {
        // Implementation based on earlier logic
        return 0; // Replace with actual implementation
    };
    CatEngineService.prototype.normalizeWorkExperience = function (workExMonths) {
        return Math.min(workExMonths / 60, 1) * 100;
    };
    CatEngineService.prototype.classifyChance = function (compositeScore, historicalCutoff) {
        if (!historicalCutoff)
            return 'DREAM';
        if (compositeScore >= historicalCutoff)
            return 'SAFE';
        if (compositeScore >= historicalCutoff * 0.9)
            return 'TARGET';
        return 'DREAM';
    };
    CatEngineService.prototype.calculateConfidenceBand = function (dataSource) {
        switch (dataSource) {
            case 'RTI': return 'HIGH';
            case 'Official': return 'HIGH';
            case 'Crowdsourced': return 'MEDIUM';
            default: return 'LOW';
        }
    };
    CatEngineService.prototype.generateReasoning = function (compositeScore, cutoff, classification) {
        return [
            "Composite Score: ".concat(compositeScore.toFixed(2)),
            cutoff ? "Last Year Cutoff: ".concat(cutoff.compositeCutoff) : 'No historical data',
            "Classification: ".concat(classification),
        ];
    };
    var CatEngineService_1;
    CatEngineService = CatEngineService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(iim_admission_model_entity_1.IIMAdmissionModel)),
        __param(1, (0, typeorm_1.InjectRepository)(historical_cutoff_entity_1.HistoricalCutoff))
    ], CatEngineService);
    return CatEngineService;
}());
exports.CatEngineService = CatEngineService;
