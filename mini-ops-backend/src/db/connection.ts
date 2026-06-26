import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import env from "../../env.ts";
import { relations, tableSchema } from "./schema.ts";
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const db = drizzle({ client: pool, relations, schema: tableSchema });
export default db;
