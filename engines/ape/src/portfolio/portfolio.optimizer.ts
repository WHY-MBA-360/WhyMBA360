import {
  ApplicationPortfolio,
  InstituteProbability,
  PortfolioEntry,
  PortfolioBucket,
} from "./portfolio.types";

function classify(prob: number): PortfolioBucket {
  if (prob >= 0.6) return "SAFE";
  if (prob >= 0.3) return "STRETCH";
  return "LOTTERY";
}

export function buildApplicationPortfolio(
  probabilities: InstituteProbability[]
): ApplicationPortfolio {

  const result: ApplicationPortfolio = {
    safe: [],
    stretch: [],
    lottery: [],
  };

  probabilities.forEach(p => {
    const bucket = classify(p.probability);

    const entry: PortfolioEntry = {
      ...p,
      bucket,
      rationale:
        bucket === "SAFE"
          ? "High likelihood based on current profile"
          : bucket === "STRETCH"
          ? "Competitive but achievable with strong execution"
          : "Low probability, high upside",
    };

    result[bucket.toLowerCase() as "safe" | "stretch" | "lottery"].push(entry);
  });

  return result;
}
