<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Menu from '$lib/components/card-post-menu.svelte';

	type Props = {
		postData: {
			title: string;
			content: string;
		};
	};

	let { postData }: Props = $props();
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between">
		<Card.Title>{postData.title}</Card.Title>
		<Menu />
	</Card.Header>
	<Card.Content>
		<p>{postData.content}</p>
	</Card.Content>
</Card.Root>
