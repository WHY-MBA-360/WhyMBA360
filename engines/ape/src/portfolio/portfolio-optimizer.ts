import {
  InstituteProbability,
  PortfolioRecommendation,
  PortfolioResult,
} from "./portfolio.types";

export function buildApplicationPortfolio(
  probabilities: InstituteProbability[]
): PortfolioResult {

  const safe: PortfolioRecommendation[] = [];
  const target: PortfolioRecommendation[] = [];
  const stretch: PortfolioRecommendation[] = [];

  probabilities.forEach((p) => {
    const rec: PortfolioRecommendation = {
      institute: p.institute,
      probability: p.probability,
      bucket: "STRETCH",
    };

    if (p.probability >= 0.65) {
      rec.bucket = "SAFE";
      safe.push(rec);
    } else if (p.probability >= 0.35) {
      rec.bucket = "TARGET";
      target.push(rec);
    } else {
      stretch.push(rec);
    }
  });

  return {
    safe: safe.sort((a, b) => b.probability - a.probability),
    target: target.sort((a, b) => b.probability - a.probability),
    stretch: stretch.sort((a, b) => b.probability - a.probability),
  };
}
