import db from "./src/db/index";
import { role } from "./src/models/role";
import { rolePermission } from "./src/models/rolePermission";

//Might need to add these before seeding. I did these manually when seeding again.
// DROP TABLE IF EXISTS users CASCADE;
// DROP TABLE IF EXISTS projects CASCADE;
// DROP TABLE IF EXISTS project_members CASCADE;
// DROP TABLE IF EXISTSrole CASCADE;
// DROP TABLE IF EXISTS role_permission CASCADE;
// DROP TYPE IF EXISTS project_status CASCADE;
// DROP TYPE IF EXISTS user_role CASCADE;

async function seed() {
  console.log("SEEEEEEDING!");
  const roles = await db
    .insert(role)
    .values([
      {
        name: "SUPER_ADMIN",
        description: "Can access every project, users or roles and modify and delete them",
      },
      {
        name: "ADMIN",
        description:
          "Can access project and manage user and roles. It is below super admin. Can not modify super admin.",
      },
      { name: "MODERATOR", description: "Can access project and change user roles of a project." },
      { name: "VIEWER", description: "Normal viewers. Can only access their project." },
    ])
    .returning();

  console.log("User roles seeding complete!");
  const roleMap = Object.fromEntries(roles.map((rol) => [rol.name, rol.id]));

  await db.insert(rolePermission).values([
    { roleId: roleMap.SUPER_ADMIN, resource: "project", action: "create", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "project", action: "read", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "project", action: "update", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "project", action: "delete", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "project", action: "archive", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "task", action: "create", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "task", action: "read", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "task", action: "update", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "task", action: "delete", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "task", action: "assign", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "member", action: "invite", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "member", action: "remove", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "member", action: "read", condition: null },
    { roleId: roleMap.SUPER_ADMIN, resource: "member", action: "change_role", condition: null },
    { roleId: roleMap.ADMIN, resource: "project", action: "create", condition: null },
    { roleId: roleMap.ADMIN, resource: "project", action: "read", condition: null },
    { roleId: roleMap.ADMIN, resource: "project", action: "update", condition: "own_project" },
    { roleId: roleMap.ADMIN, resource: "project", action: "delete", condition: "own_project" },
    { roleId: roleMap.ADMIN, resource: "project", action: "archive", condition: "own_project" },
    { roleId: roleMap.ADMIN, resource: "task", action: "create", condition: null },
    { roleId: roleMap.ADMIN, resource: "task", action: "read", condition: null },
    { roleId: roleMap.ADMIN, resource: "task", action: "update", condition: null },
    { roleId: roleMap.ADMIN, resource: "task", action: "delete", condition: null },
    { roleId: roleMap.ADMIN, resource: "task", action: "assign", condition: null },
    { roleId: roleMap.ADMIN, resource: "member", action: "invite", condition: null },
    { roleId: roleMap.ADMIN, resource: "member", action: "remove", condition: "own_project" },
    { roleId: roleMap.ADMIN, resource: "member", action: "read", condition: null },
    { roleId: roleMap.ADMIN, resource: "member", action: "change_role", condition: "own_project" },
    { roleId: roleMap.MODERATOR, resource: "project", action: "read", condition: null },
    { roleId: roleMap.MODERATOR, resource: "task", action: "create", condition: null },
    { roleId: roleMap.MODERATOR, resource: "task", action: "read", condition: null },
    { roleId: roleMap.MODERATOR, resource: "task", action: "update", condition: null },
    { roleId: roleMap.MODERATOR, resource: "task", action: "delete", condition: null },
    { roleId: roleMap.MODERATOR, resource: "task", action: "assign", condition: null },
    { roleId: roleMap.MODERATOR, resource: "member", action: "read", condition: null },
    { roleId: roleMap.VIEWER, resource: "project", action: "read", condition: null },
    { roleId: roleMap.VIEWER, resource: "task", action: "read", condition: null },
    { roleId: roleMap.VIEWER, resource: "task", action: "update", condition: "own_task" },
    { roleId: roleMap.VIEWER, resource: "member", action: "read", condition: null },
  ]);

  console.log("Role Permission seeding successful!");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed!", err);
  process.exit(1);
});
