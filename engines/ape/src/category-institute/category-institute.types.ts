import { Institute } from "../institute";
import { Category } from "../category";

export type CategoryInstituteKey = `${Institute}_${Category}`;

export interface CategoryInstituteMultiplier {
  multiplier: number; // >1 boosts, <1 penalizes
}
