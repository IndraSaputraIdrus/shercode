<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Writable } from 'svelte/store';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { postSchema } from '$lib/zod-schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from './ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';

	type Props = {
		open: Writable<boolean>;
		form: SuperValidated<Infer<typeof postSchema>>;
	};

	let { open, form: formData }: Props = $props();
	const createSchema = superForm(formData, {
		validators: zodClient(postSchema),
    onUpdated: ({form: updateForm}) => {
      if(!updateForm.valid) return

      $open = false
    }
	});

	const { form: postFormData, enhance } = createSchema;
</script>

<Dialog.Root bind:open={$open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title asChild>
        <h1 class="mb-6 font-semibold text-2xl">Create new post</h1>
      </Dialog.Title>
			<form action="?/createPost" use:enhance method="POST" class="space-y-5">
				<Form.Field form={createSchema} name="title">
					<Form.Control let:attrs>
						<Form.Label>Title</Form.Label>
						<Input {...attrs} bind:value={$postFormData.title} />
					</Form.Control>
          <Form.FieldErrors />
				</Form.Field>
				<Form.Field form={createSchema} name="content">
					<Form.Control let:attrs>
						<Form.Label>Content</Form.Label>
						<Textarea {...attrs} bind:value={$postFormData.content} />
					</Form.Control>
          <Form.FieldErrors />
				</Form.Field>
        <Form.Button>Submit</Form.Button>
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
