<script lang="ts">
	import { writable } from 'svelte/store';
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';
	import { onMount } from 'svelte';

	const user = writable<any>('');
	const isLoading = writable<boolean>(false);
	const error = writable<unknown>();

	async function deleteUser(id: number) {
		const url = `http://localhost:4000/api/auth/delete/${id}`;
		try {
			isLoading.set(true);
			const response = await fetch(url, { method: 'DELETE' });
			console.log(await response.json());
			if (response.ok) {
                sessionStorage.removeItem("user")
                sessionStorage.removeItem("loggedIn")
				window.location.href = '/';
			}
		} catch (err) {
			console.error(err);
			error.set(err);
		} finally {
			isLoading.set(false);
		}
	}

	function handleDeleteUser() {
		deleteUser($user.id);
	}

	onMount(async () => {
		const storage = sessionStorage.getItem('user');
		if (storage === null) return;
		const parsed = JSON.parse(storage);
		user.set(parsed);
	});
</script>

<Nav />
<Content columns={12}>
	<div class="user-info">
		<p>Email: {$user.email}</p>
		<button class="btn-delete" on:click={handleDeleteUser}>Delete</button>
	</div>
</Content>

<style>
	.user-info {
		grid-column: 2/-2;
	}

	.btn-delete {
		background: #ffa0a0;
		border-radius: 15px;
		border: none;
		box-shadow: none;
		padding: 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
