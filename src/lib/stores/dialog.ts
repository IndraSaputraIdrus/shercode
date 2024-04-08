import { writable } from 'svelte/store';

type Stores = {
	addDialog: boolean;
	menuDialog: boolean;
	deleteDialog: boolean;
	deleteDialogId: string | null;
};

export const dialogStores = writable<Stores>({
	addDialog: false,
	menuDialog: false,
	deleteDialog: false,
	deleteDialogId: null
});
