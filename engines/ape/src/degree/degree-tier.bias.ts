import { DegreeTier } from "./degree.types";

export const DEGREE_TIER_BIAS: Record<DegreeTier, number> = {
  IIT: +6,
  NIT: +3,
  TOP_PRIVATE: +1,
  PRIVATE: -1,
  OTHER: -2,
};
