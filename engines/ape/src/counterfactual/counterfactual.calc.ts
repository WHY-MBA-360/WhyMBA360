import { AdmissionProbabilityInput } from "../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../admission-probability.service";
import { CounterfactualResult } from "./counterfactual.types";

export function computeCounterfactuals(
  input: AdmissionProbabilityInput,
  engine: AdmissionProbabilityService
): CounterfactualResult[] {

  const base = engine.calculate(input).probability;

  const scenarios: CounterfactualResult[] = [];

  // 1?? +5 score
  const scoreBoost = engine.calculate({
    ...input,
    normalizedScore: input.normalizedScore + 5,
  }).probability;

  scenarios.push({
    action: "INCREASE_SCORE",
    deltaProbability: scoreBoost - base,
    effortLevel: "MEDIUM",
    explanation: "+5 percentile improves shortlist odds significantly",
  });

  // 2?? +6 months work-ex
  const workExBoost = engine.calculate({
    ...input,
    workExperienceMonths: input.workExperienceMonths + 6,
  }).probability;

  scenarios.push({
    action: "ADD_WORK_EX",
    deltaProbability: workExBoost - base,
    effortLevel: "LOW",
    explanation: "Additional work-ex strengthens profile depth",
  });

  // 3?? Academic improvement (trend)
  const academicBoost = engine.calculate({
    ...input,
    academicTrend: "IMPROVING",
  }).probability;

  scenarios.push({
    action: "IMPROVE_ACADEMICS",
    deltaProbability: academicBoost - base,
    effortLevel: "HIGH",
    explanation: "Improving academics reduces academic risk penalty",
  });

  return scenarios
    .filter(s => s.deltaProbability > 0)
    .sort((a, b) => b.deltaProbability - a.deltaProbability);
}
