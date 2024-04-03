import { superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/zod-schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginSchema))
  }
}
