<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import AddPostDialog from '$lib/components/add-post-dialog.svelte';
	import DeletePostDialog from '$lib/components/delete-post-dialog.svelte';
	import { page } from '$app/stores';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { postSchema } from '$lib/zod-schema';
	import { dialogStores } from '$lib/stores/dialog';

	let createFormSchema = $derived($page.data.createFormSchema) as SuperValidated<
		Infer<typeof postSchema>
	>;

	function handleOpenDialog(e: MouseEvent) {
		e.preventDefault();
		$dialogStores.addDialog = true;
	}
</script>

<aside
	class={cn('h-full w-60', 'border-r border-border', 'px-5 pt-10', 'fixed', 'flex flex-col gap-3')}
>
	<Button onclick={handleOpenDialog}>Add new post</Button>
	<form action="/logout" method="POST">
		<Button class="w-full" variant="destructive" type="submit">Logout</Button>
	</form>
</aside>

<AddPostDialog form={createFormSchema} />
<DeletePostDialog />
