<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { dialogStores } from '$lib/stores/dialog';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { deletePostSchema } from '$lib/zod-schema';

	function handleCancel(e?: MouseEvent) {
		e?.preventDefault();
		$dialogStores.deleteDialog = false;
		$dialogStores.deleteDialogId = null;
	}

	const form = superForm($page.data.deleteFormSchema, {
		validators: zodClient(deletePostSchema),
		onUpdated: ({ form: updatedForm }) => {
			if (!updatedForm.valid) return;
			handleCancel();
		}
	});

	const { enhance, errors } = form;
</script>

<AlertDialog.Root bind:open={$dialogStores.deleteDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title asChild>
				<h1 class="mb-6 text-2xl font-semibold">Create new post</h1>
			</AlertDialog.Title>
			<AlertDialog.Description>Are you sure you want to delete this post?</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form use:enhance method="POST" action={`?/deletePost&id=${$dialogStores.deleteDialogId}`}>
				<Button variant="destructive" type="submit">Delete</Button>
			</form>
			<AlertDialog.Cancel asChild let:builder>
				<Button onclick={handleCancel} builders={[builder]} variant="outline" type="submit"
					>Cancel</Button
				>
			</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
