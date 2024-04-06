<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import AddPostDialog from '$lib/components/add-post-dialog.svelte';
	import { writable } from 'svelte/store';
  import {page} from "$app/stores"
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { postSchema } from '$lib/zod-schema';

	let open = writable(false);

  let createFormSchema = $derived($page.data.createFormSchema) as SuperValidated<Infer<typeof postSchema>>
</script>

<aside
	class={cn('h-full w-60', 'border-r border-border', 'px-5 pt-10', 'fixed', 'flex flex-col gap-3')}
>
	<Button on:click={() => ($open = true)}>Add new post</Button>
	<form action="/logout" method="POST">
		<Button class="w-full" variant="destructive" type="submit">Logout</Button>
	</form>
</aside>

<AddPostDialog {open} form={createFormSchema} />

