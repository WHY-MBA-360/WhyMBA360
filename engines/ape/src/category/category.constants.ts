export type Category =
  | "GEN"
  | "OBC"
  | "SC"
  | "ST"
  | "EWS";

export const CATEGORY_SEAT_SHARE: Record<Category, number> = {
  GEN: 0.40,
  OBC: 0.27,
  SC: 0.15,
  ST: 0.08,
  EWS: 0.10,
};
