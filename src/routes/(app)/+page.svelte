<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	let { data } = $props();
</script>

<div class="mx-auto flex h-full max-w-5xl">
	<aside class="w-60 border-r border-border pt-10">
		<form action="/logout" method="POST">
			<Button type="submit">Logout</Button>
		</form>
	</aside>
	<main class="flex-1 px-5 pt-10">
		<pre>{JSON.stringify(data, null, 2)}</pre>
		<h1>Welcome</h1>
	</main>
</div>
