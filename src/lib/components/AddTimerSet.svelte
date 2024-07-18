<script lang="ts">
	import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
	const isLoading = writable<boolean>(false);
	const insertRequest = writable<string>('');
	const fetchError = writable<unknown>('');

	async function handleInsert() {
		isLoading.set(true);
		const user = sessionStorage.getItem('user');
		if (user === null) return;
		const parsed = JSON.parse(user);
		const userId = parsed.id;
        console.log(userId)
		async function insertTimer(id: number) {
			try {
				const url = `http://localhost:4000/api/sets/${id}`;
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						userId: id,
						name: '',
						timerOrder: '[]'
					})
				});
				return await response.json();
			} catch (err) {
				console.error(err);
			}
		}
		try {
			insertRequest.set(await insertTimer(userId));
            dispatch("dbinsert", {status:"success"})
		} catch (err) {
			console.error(err);
			fetchError.set(err);
		} finally {
			isLoading.set(false);
		}
	}
</script>

<button class="add-button" on:click={handleInsert}>
	<!-- SVG Icon with dimensions 56x56 -->
	<svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
		<!-- Background circle -->
		<circle cx="28" cy="28" r="28" fill="#000" />
		<!-- Plus sign -->
		<line x1="28" y1="14" x2="28" y2="42" stroke="white" stroke-width="4" />
		<line x1="14" y1="28" x2="42" y2="28" stroke="white" stroke-width="4" />
	</svg>
</button>

<style>
	.add-button {
		background: transparent;
		width: fit-content;
		height: fit-content;
		border: none;
		box-shadow: none;
		cursor: pointer;
	}
</style>
