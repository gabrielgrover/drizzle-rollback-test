import { drizzle } from "drizzle-orm/better-sqlite3";
import DB from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new DB("./test.db");
export const db = drizzle(sqlite, {schema})
