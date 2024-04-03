<script lang="ts">
	import { cn } from '$lib/utils';
	import { loginSchema } from '$lib/zod-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/';

	const { data } = $props();
	const formSchema = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	const { form: loginForm, enhance } = formSchema;
</script>

<main class={cn('h-full', 'flex items-center justify-center')}>
	<div class="mx-auto w-full max-w-lg space-y-5">
		<h1 class={cn('text-4xl', 'font-semibold')}>Login</h1>
		<form method="post" use:enhance>
			<div class="space-y-3">
				<Form.Field form={formSchema} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={$loginForm.username} autocomplete="off" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={formSchema} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$loginForm.password} autocomplete="off" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="w-full">Login</Form.Button>
			</div>
		</form>
	</div>
</main>
