import { CounterfactualOption, CounterfactualResult } from "./counterfactual.types";
import { AdmissionProbabilityService } from "../admission-probability.service";

export function computeFastestOddsIncrease(
  service: AdmissionProbabilityService,
  input: any,
  baselineProbability: number
): CounterfactualResult {

  const options: CounterfactualOption[] = [];

  // 1?? CAT score +5
  const catBoost = { ...input, normalizedScore: input.normalizedScore + 5 };
  const catProb = service.calculate(catBoost).probability;

  options.push({
    factor: "Exam Score",
    currentValue: input.normalizedScore,
    targetValue: input.normalizedScore + 5,
    deltaProbability: catProb - baselineProbability,
    effortScore: 3,
    roi: (catProb - baselineProbability) / 3,
  });

  // 2?? Work experience +12 months
  const workBoost = { ...input, workExperienceMonths: input.workExperienceMonths + 12 };
  const workProb = service.calculate(workBoost).probability;

  options.push({
    factor: "Work Experience",
    currentValue: input.workExperienceMonths,
    targetValue: input.workExperienceMonths + 12,
    deltaProbability: workProb - baselineProbability,
    effortScore: 6,
    roi: (workProb - baselineProbability) / 6,
  });

  // 3?? Academic improvement (trend correction)
  const acadBoost = { ...input, academicTrend: "improving" };
  const acadProb = service.calculate(acadBoost).probability;

  options.push({
    factor: "Academic Trend",
    currentValue: 0,
    targetValue: 1,
    deltaProbability: acadProb - baselineProbability,
    effortScore: 2,
    roi: (acadProb - baselineProbability) / 2,
  });

  options.sort((a, b) => b.roi - a.roi);

  return {
    baselineProbability,
    bestMove: options[0],
    rankedOptions: options,
  };
}
