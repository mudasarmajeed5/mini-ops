import db from "./connection.ts";
import { users, logs, services } from "./schema.ts";

async function clearDB() {
  console.log("Preparing to clear database.")
  try {
    await db.delete(users);
    await db.delete(logs);
    await db.delete(services);
    console.log("Database cleared")
    process.exit(0)
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1)
  }
}

clearDB()