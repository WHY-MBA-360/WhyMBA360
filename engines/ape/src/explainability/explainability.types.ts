import { Institute } from "../institute";
import { Category } from "../category";

export interface ProbabilityExplanationComponent {
  label: string;
  delta: number;
  reason: string;
}

export interface ProbabilityComparisonExplanation {
  baseA: number;
  baseB: number;
  finalDelta: number;
  components: ProbabilityExplanationComponent[];
  conclusion: string;
}
