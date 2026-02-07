export function sigmoid(
  x: number,
  midpoint: number,
  steepness: number
): number {
  return 100 / (1 + Math.exp(-steepness * (x - midpoint)));
}
