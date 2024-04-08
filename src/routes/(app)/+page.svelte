<script lang="ts">
	import CardPost from '$lib/components/card-post.svelte';
	let { data } = $props();
</script>

<h1 class="mb-3 text-3xl font-semibold">
	Welcome <span class="text-indigo-500">
		{data.user.username}
	</span>
</h1>
<div class="grid grid-cols-1 gap-5 pb-5">
	{#each data.posts as post}
		<CardPost postData={post} />
	{/each}
</div>
