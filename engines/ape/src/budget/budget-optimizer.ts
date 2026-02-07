import {
  BudgetInput,
  BudgetedInstituteScore,
  InstituteCost,
} from "./budget.types";

import { InstituteProbability } from "../portfolio";

export function applyBudgetOptimization(
  probabilities: InstituteProbability[],
  budget: BudgetInput
): BudgetedInstituteScore[] {

  const costMap = new Map<string, InstituteCost>();
  budget.costs.forEach(c => costMap.set(c.institute, c));

  return probabilities
    .map(p => {
      const cost = costMap.get(p.institute);
      if (!cost) return null;

      const totalCost = cost.applicationFee + cost.travelCost;

      return {
        institute: p.institute,
        probability: p.probability,
        totalCost,
        roiScore: p.probability / totalCost,
      };
    })
    .filter(
      (x): x is BudgetedInstituteScore =>
        !!x && x.totalCost <= budget.totalBudget
    )
    .sort((a, b) => b.roiScore - a.roiScore);
}
