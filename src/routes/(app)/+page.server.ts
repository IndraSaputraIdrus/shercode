import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { postSchema } from "$lib/zod-schema"

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
