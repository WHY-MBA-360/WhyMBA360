export interface DeltaComponent {
  factor: string;
  instituteA: number;
  instituteB: number;
  delta: number;
  explanation: string;
}

export interface InstituteDeltaExplanation {
  winner: "IIM_A" | "IIM_B" | "IIM_C";
  loser: "IIM_A" | "IIM_B" | "IIM_C";
  totalDelta: number;
  components: DeltaComponent[];
}
