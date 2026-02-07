import { calibratedProbability } from "../calibration/calibration.engine";
import { InstituteProbability } from "./probability-vector.types";

const SUPPORTED_INSTITUTES = [
  "IIM_A",
  "IIM_B",
  "IIM_C"
];

export function computeProbabilityVector(
  baseScore: number
): InstituteProbability[] {
  return SUPPORTED_INSTITUTES.map((institute) => {
    const probability = calibratedProbability(institute, baseScore);

    return {
      institute,
      probability: clamp(probability),
    };
  });
}

function clamp(x: number): number {
  return Math.min(1, Math.max(0, Number(x.toFixed(3))));
}
