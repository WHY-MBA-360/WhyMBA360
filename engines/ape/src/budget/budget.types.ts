import { PortfolioBucket } from "../portfolio/portfolio.types";

export interface InstituteCost {
  institute: string;
  formFee: number;
  travelCost: number;
}

export interface BudgetAwareEntry {
  institute: string;
  probability: number;
  bucket: PortfolioBucket;
  totalCost: number;
  roiScore: number;
}

export interface BudgetOptimizationResult {
  selected: BudgetAwareEntry[];
  skipped: BudgetAwareEntry[];
  totalBudget: number;
  usedBudget: number;
}
