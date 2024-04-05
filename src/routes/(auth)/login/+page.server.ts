import { fail, setError, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/zod-schema";
import { db } from "$lib/server/database";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { lucia } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginSchema))
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema))
    if (!form.valid) {
      return fail(400)
    }

    const existingUser = db
      .select()
      .from(users)
      .where(eq(users.username, form.data.username))
      .get()

    if (!existingUser) {
      return setError(form, "", "Invalid username or password")
      t
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })

    redirect(302, "/")
  }
}
