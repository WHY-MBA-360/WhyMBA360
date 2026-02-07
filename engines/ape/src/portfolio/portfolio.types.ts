export type PortfolioBucket = "SAFE" | "TARGET" | "STRETCH";

export interface InstituteProbability {
  institute: string;
  probability: number; // 0–1
}

export interface PortfolioRecommendation {
  institute: string;
  probability: number;
  bucket: PortfolioBucket;
}

export interface PortfolioResult {
  safe: PortfolioRecommendation[];
  target: PortfolioRecommendation[];
  stretch: PortfolioRecommendation[];
}
