import { db } from './database';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { sessions, users } from './schema';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

export const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},

	getUserAttributes: (attributes) => {
		return {
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
