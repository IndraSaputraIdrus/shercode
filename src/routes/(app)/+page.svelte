<script lang="ts">
import {cn} from "$lib/utils"
	import { Button } from '$lib/components/ui/button';
	import CardPost from '$lib/components/card-post.svelte';
	let { data } = $props();
</script>

<div class="mx-auto flex h-full max-w-5xl">
	<aside class={cn(
    'h-full w-60', 
    'border-r border-border', 
    'pt-10',
    "fixed",
    "px-5"
  )}>
		<form action="/logout" method="POST">
			<Button class="w-full" type="submit">Logout</Button>
		</form>
	</aside>
	<main class="flex-1 h-full px-5 pt-10 ml-60">
		<h1 class="text-3xl font-semibold mb-3">Welcome <span class="text-indigo-500">
{data.user.username}
    </span></h1>
		<div class="grid grid-cols-1 gap-5 pb-5">
			{#each { length: 5 } as _}
				<CardPost />
			{/each}
		</div>
	</main>
</div>
