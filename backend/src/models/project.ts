import { InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const ProjectStatus = pgEnum("project_status", ["Active", "Archived", "Deleted"]);

export const project = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  //I will use slug to identify project info as it is easier for us to understand when sharing the link or viewing the link
  slug: varchar("slug", { length: 255 }).notNull(),
  description: varchar("description"),
  status: ProjectStatus("status").default("Active").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Project = InferSelectModel<typeof project>;
