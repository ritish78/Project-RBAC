import { index, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";
import { role } from "./role.js";
import { InferSelectModel } from "drizzle-orm";

export const rolePermission = pgTable(
  "role_permission",
  {
    id: serial("id").primaryKey(),
    roleId: serial("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    resource: varchar("resource", { length: 75 }).notNull(),
    action: varchar("action", { length: 75 }).notNull(),
    condition: varchar("condition", { length: 150 }),
  },
  (table) => [
    index("role_id_index").on(table.roleId),
    unique().on(table.roleId, table.resource, table.resource),
    //We have added a unique clause so that we don't accidentally insert
    //duplicate duplicate permission rows for the same role.
  ],
);

export type RolePermission = InferSelectModel<typeof rolePermission>;
