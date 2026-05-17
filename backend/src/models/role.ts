import { InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["SUPER_ADMIN", "ADMIN", "MODERATOR", "VIEWER"]);

export const role = pgTable("role", {
  //There are only 4 roles. Making the id serial.
  //It might also be easier to use compare role.id === 1 (for super admin)
  id: serial("id").primaryKey(),
  //   name: varchar("name").notNull().unique(),
  name: UserRole("name").default("VIEWER").notNull().unique(),
  description: varchar("description"),
});

export type Role = InferSelectModel<typeof role>;
