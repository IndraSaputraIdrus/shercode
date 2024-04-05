import { fail, setError, superValidate } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "$lib/zod-schema";
import { db } from "$lib/server/database";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password"
import { lucia } from "$lib/server/auth"
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(registerSchema))
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(registerSchema))
    if (!form.valid) {
      return fail(400, {
        form
      })
    }

    const userExist = db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.username, form.data.username))
      .get()

    if (userExist) {
      return setError(form, 'username', "Username already exist")
    }

    const userId = generateId(15)
    const hashedPassword = await new Argon2id().hash(form.data.password)

    const { insertedId } = db
      .insert(users)
      .values({
        id: userId,
        username: form.data.username,
        hashedPassword,
      })
      .returning({ insertedId: users.id })
      .get()

    const session = await lucia.createSession(insertedId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })

    redirect(302, "/login")
  }
}
