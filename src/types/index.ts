export const USER_ROLE = {
  contributor: "contributor",
  maintainer: "maintainer",
  user:"user"
} as const;

export type ROLES = "contributor" | "maintainer" | "user";