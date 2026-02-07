import data from "./calibration.data.json";

export function calibratedProbability(
  institute: string,
  rawScore: number
): number {
  const points = (data as Record<string, any[]>)[institute];
  if (!points) return rawScore;

  const bucketSize = 0.05;
  const bucket = Math.floor(rawScore / bucketSize) * bucketSize;

  const bucketPoints = points.filter(
    p => Math.abs(p.score - bucket) <= bucketSize
  );

  if (bucketPoints.length === 0) return rawScore;

  const admitRate =
    bucketPoints.filter(p => p.admitted).length /
    bucketPoints.length;

  return sigmoid(admitRate);
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-12 * (x - 0.5)));
}
