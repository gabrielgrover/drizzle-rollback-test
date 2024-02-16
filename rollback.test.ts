import { test, expect } from "vitest";
import { db } from "./database";
import * as Schema from "./schema";
import {eq} from "drizzle-orm";
import { faker } from "@faker-js/faker";

test("Should rollback", async () => {
	const name = faker.person.firstName();
  await expect(() =>
    addUser(name)
  ).rejects.toThrow();
	
  const users = await db
    .select()
    .from(Schema.users)
    .where(eq(Schema.users.name, name));

  expect(users).toHaveLength(0);
});

async function addUser(name: string) {
  await db.transaction(async tx => {
    await tx.insert(Schema.users).values({
      name
    });

    throw new Error("BOOM");
  });
}
