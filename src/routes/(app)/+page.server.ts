import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { postSchema, deletePostSchema } from '$lib/zod-schema';
import { generateId } from 'lucia';
import { db } from '$lib/server/database';
import { posts } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const createFormSchema = await superValidate(zod(postSchema));
	const deleteFormSchema = await superValidate(zod(deletePostSchema));

	const postsData = db.select().from(posts).all();

	return {
		user: event.locals.user,
		session: event.locals.session,
		posts: postsData,
		createFormSchema,
		deleteFormSchema
	};
};

export const actions: Actions = {
	createPost: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/login');
		}

		const form = await superValidate(event, zod(postSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const postId = generateId(15);

		db.insert(posts)
			.values({
				id: postId,
				userId: event.locals.user.id,
				...form.data
			})
			.run();

		return { form };
	},
	deletePost: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/login');
		}
		const form = await superValidate(event.url, zod(deletePostSchema));

		if (!form.valid) {
			setError(form, '', 'Unable to delete post');
		}

		db.delete(posts).where(eq(posts.id, form.data.id)).run();

		return {
			form
		};
	}
};
