import { InstituteConfidenceMap } from "../confidence/institute/institute-confidence.types";
import { ConfidenceWeightedRanking, RankedInstitute } from "./confidence-ranking.types";
import { RISK_PENALTY } from "./risk-penalty";

export function calculateConfidenceWeightedRanking(
  confidenceMap: InstituteConfidenceMap
): ConfidenceWeightedRanking {

  const ranked: RankedInstitute[] = Object.entries(confidenceMap).map(
    ([institute, band]) => {
      const spread = band.high - band.low;
      const penalty = RISK_PENALTY[band.riskLevel];

      const weightedScore = band.base - penalty * spread;

      return {
        institute: institute as RankedInstitute["institute"],
        baseProbability: band.base,
        confidenceSpread: spread,
        weightedScore: Math.round(weightedScore * 10) / 10,
        riskLevel: band.riskLevel,
      };
    }
  );

  ranked.sort((a, b) => b.weightedScore - a.weightedScore);

  return {
    ranking: ranked,
    recommendedInstitute: ranked[0].institute,
  };
}
