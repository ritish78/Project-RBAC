import pkg from "pg";
import { DATABASE_URL } from "src/config/index.js";
import { drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pkg;

const pool: pkg.Pool = new Pool({ connectionString: DATABASE_URL });

pool.on("connect", () => {
  console.log("Connected to Postgres!");
});

pool.on("release", () => {
  console.log("Released from pool!");
});

//This is just a one timer function to connect with postgres on starup
//it then releases immediately.
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("Connection to Postgres failed!", err.message);
//     process.exit(1);
//   }
//   console.log("Postgres ready to accept requests!");
//   release();
// });
pool
  .connect()
  .then((client) => {
    console.log("Connected to Postgres!");
    client.release();
  })
  .catch((err) => {
    console.error("Connection to Postgres failed!", err.message);
    process.exit(1);
  });

const db = drizzle(pool, { logger: true });

export default db;
