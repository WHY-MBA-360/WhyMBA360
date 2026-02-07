export interface ImprovementStep {
  step: number;
  factor: string;
  fromValue: number;
  toValue: number;
  deltaProbability: number;
  cumulativeProbability: number;
}

export interface ImprovementPath {
  startProbability: number;
  finalProbability: number;
  steps: ImprovementStep[];
}
