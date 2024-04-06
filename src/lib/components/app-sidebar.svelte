<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
</script>

<aside class={cn('h-full w-60', 'border-r border-border', 'pt-10', 'fixed', 'px-5')}>
	<form action="/logout" method="POST">
		<Button class="w-full" type="submit">Logout</Button>
	</form>
</aside>
