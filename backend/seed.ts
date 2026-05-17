import db from "./src/db/index";
import { role } from "./src/models/role";

async function seed() {
  console.log("SEEEEEEDING!");
  await db.insert(role).values([
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
  ]);

  console.log("User roles seeding complete!");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed!", err);
  process.exit(1);
});
