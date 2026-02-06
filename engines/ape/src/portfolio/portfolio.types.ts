export type PortfolioBucket = "SAFE" | "STRETCH" | "LOTTERY";

export interface InstituteProbability {
  institute: string;
  probability: number;
}

export interface PortfolioEntry extends InstituteProbability {
  bucket: PortfolioBucket;
  rationale: string;
}

export interface ApplicationPortfolio {
  safe: PortfolioEntry[];
  stretch: PortfolioEntry[];
  lottery: PortfolioEntry[];
}
