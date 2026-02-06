import {
  InstituteCost,
  BudgetAwareEntry,
  BudgetOptimizationResult,
} from "./budget.types";

import { InstituteProbability } from "../portfolio/portfolio.types";

export function optimizeByBudget(
  probabilities: InstituteProbability[],
  costs: InstituteCost[],
  budget: number
): BudgetOptimizationResult {

  const costMap = new Map(
    costs.map(c => [c.institute, c.formFee + c.travelCost])
  );

  const entries: BudgetAwareEntry[] = probabilities.map(p => {
    const totalCost = costMap.get(p.institute) ?? Infinity;
    return {
      institute: p.institute,
      probability: p.probability,
      bucket:
        p.probability >= 0.6
          ? "SAFE"
          : p.probability >= 0.3
          ? "STRETCH"
          : "LOTTERY",
      totalCost,
      roiScore: p.probability / totalCost,
    };
  });

  const sorted = entries.sort((a, b) => b.roiScore - a.roiScore);

  const selected: BudgetAwareEntry[] = [];
  const skipped: BudgetAwareEntry[] = [];

  let usedBudget = 0;

  for (const entry of sorted) {
    if (usedBudget + entry.totalCost <= budget) {
      selected.push(entry);
      usedBudget += entry.totalCost;
    } else {
      skipped.push(entry);
    }
  }

  return {
    selected,
    skipped,
    totalBudget: budget,
    usedBudget,
  };
}
