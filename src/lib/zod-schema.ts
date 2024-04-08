import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z.string().min(5).max(255),
		password: z.string().min(5).max(255),
		passwordConfirm: z.string().min(5).max(255)
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm']
	});

export const loginSchema = z.object({
	username: z.string().min(5).max(255),
	password: z.string().min(5).max(255)
});

export const postSchema = z.object({
	title: z.string().min(2).max(255),
	content: z.string().min(1)
});

export const deletePostSchema = z.object({
	id: z.string()
});
