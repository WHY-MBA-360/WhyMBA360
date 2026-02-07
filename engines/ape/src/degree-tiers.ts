import { DegreeTier } from "./dto/admission-probability.input";

export const DEGREE_TIER_MULTIPLIER: Record<DegreeTier, number> = {
  IIT: 1.08,
  NIT: 1.04,
  PRIVATE: 1.0,
};
