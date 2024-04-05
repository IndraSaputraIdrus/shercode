<script lang="ts">
	import { cn } from '$lib/utils';
	import { registerSchema } from '$lib/zod-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/';

	const { data } = $props();
	const formSchema = superForm(data.form, {
		validators: zodClient(registerSchema)
	});

	const { form: registerForm, enhance, errors } = formSchema;
</script>

<main class={cn('h-full', 'flex items-center justify-center')}>
	<div class="mx-auto w-full max-w-lg space-y-5">
		<h1 class={cn('text-4xl', 'font-semibold')}>Register</h1>
		<form method="post" use:enhance>
			<div class="space-y-3">
				<Form.Field form={formSchema} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={$registerForm.username} autocomplete="off" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={formSchema} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input
							{...attrs}
							type="password"
							bind:value={$registerForm.password}
							autocomplete="off"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={formSchema} name="passwordConfirm">
					<Form.Control let:attrs>
						<Form.Label>Password Confirm</Form.Label>
						<Input
							{...attrs}
							type="password"
							bind:value={$registerForm.passwordConfirm}
							autocomplete="off"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<div class="text-destructive" aria-live="assertive">
					{#if $errors._errors}
						{#each $errors._errors as error}
							<p>{error}</p>
						{/each}
					{/if}
				</div>

				<Form.Button class="w-full">Sign up</Form.Button>
			</div>
		</form>
	</div>
</main>
