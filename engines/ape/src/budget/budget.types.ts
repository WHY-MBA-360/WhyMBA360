export interface InstituteCost {
  institute: string;
  applicationFee: number;
  travelCost: number;
}

export interface BudgetInput {
  totalBudget: number;
  costs: InstituteCost[];
}

export interface BudgetedInstituteScore {
  institute: string;
  probability: number;
  totalCost: number;
  roiScore: number; // probability / cost
}
