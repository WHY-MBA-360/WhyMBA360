import { ScoreNormalizerService } from "./score-normalizer.service";

describe("ScoreNormalizerService", () => {
  const service = new ScoreNormalizerService();

  it("normalizes a CAT mid score", () => {
    const result = service.normalize({ exam: "CAT", rawScore: 240 });
    expect(result.normalizedScore).toBeGreaterThan(70);
  });

  it("assigns top percentile band for high CAT score", () => {
    const result = service.normalize({ exam: "CAT", rawScore: 300 });
    expect(result.percentileBand).toBe("95–100");
  });
});
