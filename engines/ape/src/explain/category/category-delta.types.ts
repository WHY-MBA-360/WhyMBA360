export interface CategoryDelta {
  category: "GEN" | "OBC" | "SC" | "ST";
  delta: number; // points vs GEN baseline
}
