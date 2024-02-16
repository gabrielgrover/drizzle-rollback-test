import { text, sqliteTableCreator, integer } from "drizzle-orm/sqlite-core";

const createTable = sqliteTableCreator(name => name);

export const users = createTable("user", {
	id: integer("id").primaryKey({autoIncrement: true}),
	name: text("name"),
});

