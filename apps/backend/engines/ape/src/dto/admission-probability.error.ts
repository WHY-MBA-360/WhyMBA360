export type AdmissionProbabilityError =
  | { code: "INVALID_SCORE"; message: string }
  | { code: "COLLEGE_NOT_SUPPORTED"; message: string }
  | { code: "INVALID_PROFILE_DATA"; message: string };
