import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { project } from "./project.js";
import { user } from "./user.js";
import { role } from "./role.js";

export const projectMembers = pgTable("project_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => project.id),
  userId: uuid("user_id").references(() => user.id),
  roleId: uuid("role_id").references(() => role.id),
  joinedAt: timestamp("joined_at").defaultNow(),
});
