<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import CardPost from '$lib/components/card-post.svelte';
	let { data } = $props();
</script>

		<h1 class="mb-3 text-3xl font-semibold">
			Welcome <span class="text-indigo-500">
				{data.user.username}
			</span>
		</h1>
		<div class="grid grid-cols-1 gap-5 pb-5">
			{#each { length: 5 } as _}
				<CardPost />
			{/each}
		</div>
