import { fail, superValidate } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "$lib/zod-schema";

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
    return {
      form
    }
  }
}
