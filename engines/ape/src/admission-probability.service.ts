import { Injectable } from "@nestjs/common";
import { AdmissionProbabilityInput } from "./dto/admission-probability.input";
import { AdmissionProbabilityOutput } from "./dto/admission-probability.output";

type Category = "GEN" | "OBC" | "SC" | "ST";
type Institute = "IIM_A" | "IIM_B" | "IIM_C";

@Injectable()
export class AdmissionProbabilityService {
  calculate(input: AdmissionProbabilityInput): AdmissionProbabilityOutput {
    const {
      institute,
      category,
      normalizedScore,
      academics,
      workExMonths,
    } = input;

    const cutoff = this.getCutoff(institute, category);
    if (normalizedScore < cutoff) {
      return this.zero(institute, "Score below cutoff");
    }

    const scoreStrength = this.scoreStrength(normalizedScore, cutoff);
    const academicStrength = this.academicStrength(academics);
    const workExStrength = this.workExStrength(institute, workExMonths);

    const weights = this.getWeights(institute);
    const composite =
      weights.score * scoreStrength +
      weights.academics * academicStrength +
      weights.workEx * workExStrength;

    const probability = Math.min(
      95,
      Math.max(1, Math.round(100 * composite * this.selectivity(institute)))
    );

    return {
      institute,
      probability,
      breakdown: {
        score: scoreStrength,
        academics: academicStrength,
        workEx: workExStrength,
      },
    };
  }

  // ---------- CORE LOGIC ----------

  private scoreStrength(score: number, cutoff: number): number {
    const margin = score - cutoff;
    const logistic = 1 / (1 + Math.exp(-0.25 * margin));
    return this.clamp(logistic, 0.2, 0.95);
  }

  private academicStrength(a: AdmissionProbabilityInput["academics"]): number {
    const raw =
      0.3 * a.class10 +
      0.3 * a.class12 +
      0.4 * a.grad;

    const trendAdj =
      a.trend === "IMPROVING" ? 3 :
      a.trend === "DECLINING" ? -4 : 0;

    const streamMultiplier = a.stream === "NON_ENG" ? 1.05 : 0.95;
    const tierMultiplier = {
      IIT: 1.1,
      NIT: 1.07,
      TIER1: 1.03,
      TIER2: 1.0,
      TIER3: 0.95,
    }[a.degreeTier];

    const index =
      (raw + trendAdj) * streamMultiplier * tierMultiplier;

    return this.clamp(index / 100, 0.3, 0.95);
  }

  private workExStrength(institute: Institute, months: number): number {
    const ideal = {
      IIM_A: 30,
      IIM_B: 36,
      IIM_C: 24,
    }[institute];

    const variance = 144;
    const strength = Math.exp(-Math.pow(months - ideal, 2) / (2 * variance));
    return this.clamp(strength, 0.4, 1.0);
  }

  // ---------- CONFIG ----------

  private getCutoff(inst: Institute, cat: Category): number {
    const table = {
      IIM_A: { GEN: 99, OBC: 97, SC: 92, ST: 92 },
      IIM_B: { GEN: 98, OBC: 96, SC: 90, ST: 90 },
      IIM_C: { GEN: 97, OBC: 95, SC: 90, ST: 90 },
    };
    return table[inst][cat];
  }

  private getWeights(inst: Institute) {
    return {
      IIM_A: { score: 0.55, academics: 0.3, workEx: 0.15 },
      IIM_B: { score: 0.45, academics: 0.3, workEx: 0.25 },
      IIM_C: { score: 0.5, academics: 0.25, workEx: 0.25 },
    }[inst];
  }

  private selectivity(inst: Institute): number {
    return {
      IIM_A: 0.75,
      IIM_B: 0.85,
      IIM_C: 0.9,
    }[inst];
  }

  // ---------- HELPERS ----------

  private clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
  }

  private zero(inst: Institute, reason: string): AdmissionProbabilityOutput {
    return {
      institute: inst,
      probability: 0,
      breakdown: { score: 0, academics: 0, workEx: 0 },
      reasons: [reason],
    };
  }
}
