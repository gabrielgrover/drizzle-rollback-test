import { test, expect } from "vitest";
import { db } from "./database";
import * as Schema from "./schema";
import {eq} from "drizzle-orm";

test("Should rollback", async () => {
  await expect(() =>
    addTwoUsers()
  ).rejects.toThrow();
	
	const users = await db
		.select()
		.from(Schema.users)
		.where(eq(Schema.users.name, "duder"));

	expect(users).toHaveLength(0);
});

async function addTwoUsers() {
	await db.transaction(async tx => {
		await tx.insert(Schema.users).values({
			name: "duder"
		});

		throw new Error("BOOM");
	});
}
