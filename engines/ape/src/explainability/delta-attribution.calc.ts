import { InstituteConfidenceMap } from "../confidence/institute/institute-confidence.types";
import { RISK_PENALTY } from "../ranking/risk-penalty";
import { InstituteDeltaExplanation } from "./delta-attribution.types";

export function explainInstituteDelta(
  a: "IIM_A" | "IIM_B" | "IIM_C",
  b: "IIM_A" | "IIM_B" | "IIM_C",
  confidenceMap: InstituteConfidenceMap
): InstituteDeltaExplanation {

  const A = confidenceMap[a];
  const B = confidenceMap[b];

  const spreadA = A.high - A.low;
  const spreadB = B.high - B.low;

  const penaltyA = RISK_PENALTY[A.riskLevel] * spreadA;
  const penaltyB = RISK_PENALTY[B.riskLevel] * spreadB;

  const weightedA = A.base - penaltyA;
  const weightedB = B.base - penaltyB;

  const winner = weightedA > weightedB ? a : b;
  const loser = winner === a ? b : a;

  return {
    winner,
    loser,
    totalDelta: Math.round((weightedB - weightedA) * 10) / 10,
    components: [
      {
        factor: "Base Probability",
        instituteA: A.base,
        instituteB: B.base,
        delta: Math.round((B.base - A.base) * 10) / 10,
        explanation: "Difference in raw admit probability before risk adjustment",
      },
      {
        factor: "Confidence Spread",
        instituteA: spreadA,
        instituteB: spreadB,
        delta: Math.round((spreadB - spreadA) * 10) / 10,
        explanation: "Higher spread increases uncertainty and penalty",
      },
      {
        factor: "Risk Penalty",
        instituteA: penaltyA,
        instituteB: penaltyB,
        delta: Math.round((penaltyB - penaltyA) * 10) / 10,
        explanation: "Penalty applied due to confidence risk level",
      },
      {
        factor: "Final Weighted Score",
        instituteA: Math.round(weightedA * 10) / 10,
        instituteB: Math.round(weightedB * 10) / 10,
        delta: Math.round((weightedB - weightedA) * 10) / 10,
        explanation: "Final ranking score after confidence adjustment",
      },
    ],
  };
}
