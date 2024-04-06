<script lang="ts">
	import Sidebar from '$lib/components/app-sidebar.svelte';
</script>

<div class="mx-auto flex h-full max-w-5xl">
	<Sidebar />
	<main class="ml-60 h-full flex-1 px-5 pt-10">
		<slot />
	</main>
</div>
