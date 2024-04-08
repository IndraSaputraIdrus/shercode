<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	type Props = {
		postData: {
			title: string;
			content: string;
		};
	};

	let { postData }: Props = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{postData.title}</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{postData.content}</p>
	</Card.Content>
</Card.Root>
