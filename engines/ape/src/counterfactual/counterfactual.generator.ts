import { AdmissionProbabilityInput } from "../dto/admission-probability.input";
import { AdmissionProbabilityService } from "../admission-probability.service";
import { CounterfactualSuggestion } from "./counterfactual.types";

export function generateCounterfactuals(
  input: AdmissionProbabilityInput,
  service: AdmissionProbabilityService
): CounterfactualSuggestion[] {

  const base = service.calculate(input).probability;
  const suggestions: CounterfactualSuggestion[] = [];

  // 1?? Exam score +10
  if (input.examScore < 100) {
    const improved = service.calculate({
      ...input,
      examScore: input.examScore + 10,
    }).probability;

    suggestions.push({
      factor: "EXAM_SCORE",
      change: "+10 marks",
      impact: Math.round(improved - base),
    });
  }

  // 2?? Work experience +6 months
  if (input.workExMonths < 36) {
    const improved = service.calculate({
      ...input,
      workExMonths: input.workExMonths + 6,
    }).probability;

    suggestions.push({
      factor: "WORK_EX",
      change: "+6 months",
      impact: Math.round(improved - base),
    });
  }

  // 3?? Academics +5%
  if (input.academics < 95) {
    const improved = service.calculate({
      ...input,
      academics: input.academics + 5,
    }).probability;

    suggestions.push({
      factor: "ACADEMICS",
      change: "+5%",
      impact: Math.round(improved - base),
    });
  }

  return suggestions
    .filter(s => s.impact > 0)
    .sort((a, b) => b.impact - a.impact);
}
