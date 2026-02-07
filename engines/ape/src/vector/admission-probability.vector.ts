import { Institute } from "../dto/v1/admission-probability.input";

/**
 * APE v1 — Multi-Institute Probability Vector
 * One call ? many institutes
 * ?? IMMUTABLE
 */
export interface AdmissionProbabilityVectorV1 {
  probabilities: Record<Institute, number>; // 0–100
}
