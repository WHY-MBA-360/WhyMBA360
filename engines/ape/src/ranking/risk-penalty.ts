export const RISK_PENALTY = {
  LOW: 0.25,
  MEDIUM: 0.5,
  HIGH: 1.0,
} as const;

export type RiskLevel = keyof typeof RISK_PENALTY;
