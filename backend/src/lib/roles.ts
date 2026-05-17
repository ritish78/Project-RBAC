export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  VIEWER: "VIEWER",
} as const;

export type UserRoles = (typeof ROLES)[keyof typeof ROLES];
