import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { postSchema } from "$lib/zod-schema"
import { generateId } from "lucia"
import { db } from "$lib/server/database"
import { posts } from "$lib/server/schema"

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, "/login")
  }

  const createFormSchema = await superValidate(zod(postSchema))

  return {
    user: event.locals.user,
    session: event.locals.session,
    createFormSchema
  }
}

export const actions: Actions = {
  createPost: async (event) => {
    if (!event.locals.user) {
      return redirect(302, "/login")
    }

    const form = await superValidate(event, zod(postSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    const postId = generateId(15)
    db.insert(posts).values({
      id: postId,
      userId: event.locals.user.id,
      ...form.data
    }).run()

    return { form }
  }
}
