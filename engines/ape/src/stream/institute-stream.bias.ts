import { Institute } from "../dto/v1";
import { AcademicStream } from "./stream.types";

export const STREAM_BIAS: Record<
  Institute,
  Record<AcademicStream, number>
> = {
  IIM_A: {
    ENGINEER: -5,
    NON_ENGINEER: +5,
  },
  IIM_B: {
    ENGINEER: 0,
    NON_ENGINEER: 0,
  },
  IIM_C: {
    ENGINEER: 0,
    NON_ENGINEER: -3,
  },
};
