import { Institute } from "../dto/v1";

export interface TradeoffWeights {
  academics: number;
  workEx: number;
}

export const INSTITUTE_TRADEOFF_WEIGHTS: Record<Institute, TradeoffWeights> = {
  IIM_A: { academics: 0.70, workEx: 0.30 },
  IIM_B: { academics: 0.50, workEx: 0.50 },
  IIM_C: { academics: 0.40, workEx: 0.60 },
};
