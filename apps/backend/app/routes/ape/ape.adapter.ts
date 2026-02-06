import { AdmissionProbabilityService } from "engines/ape";

/**
 * Adapter layer:
 * - Bridges backend to APE engine
 * - Depends only on engine public exports
 */
export class ApeAdapter {
  constructor(
    private readonly apeService: AdmissionProbabilityService
  ) {}

  calculate(input: unknown) {
    return this.apeService.calculate(input as any);
  }
}
