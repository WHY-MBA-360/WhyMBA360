import { ImprovementPath, ImprovementStep } from "./improvement-path.types";
import { computeFastestOddsIncrease } from "../counterfactual/fastest-odds";
import { AdmissionProbabilityService } from "../admission-probability.service";

export function computeFastestImprovementPath(
  service: AdmissionProbabilityService,
  input: any,
  maxSteps = 3
): ImprovementPath {

  let currentInput = { ...input };
  let currentProbability = service.calculate(currentInput).probability;

  const steps: ImprovementStep[] = [];

  for (let i = 1; i <= maxSteps; i++) {
    const cf = computeFastestOddsIncrease(
      service,
      currentInput,
      currentProbability
    );

    const best = cf.bestMove;
    if (best.deltaProbability <= 0) break;

    // Apply best move
    switch (best.factor) {
      case "Exam Score":
        currentInput.normalizedScore = best.targetValue;
        break;
      case "Work Experience":
        currentInput.workExperienceMonths = best.targetValue;
        break;
      case "Academic Trend":
        currentInput.academicTrend = "improving";
        break;
    }

    currentProbability = service.calculate(currentInput).probability;

    steps.push({
      step: i,
      factor: best.factor,
      fromValue: best.currentValue,
      toValue: best.targetValue,
      deltaProbability: best.deltaProbability,
      cumulativeProbability: currentProbability,
    });
  }

  return {
    startProbability: service.calculate(input).probability,
    finalProbability: currentProbability,
    steps,
  };
}
