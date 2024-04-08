<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { MoreVertical, Trash, Pencil } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		<MoreVertical class="size-5" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item class="flex items-center gap-2">
			<Pencil class="size-4" />
			Edit
		</DropdownMenu.Item>
		<DropdownMenu.Item class="flex items-center gap-2">
			<Trash class="size-4" />
			Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
