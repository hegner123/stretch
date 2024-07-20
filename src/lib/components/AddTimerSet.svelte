<script lang="ts">
	import { writable } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
    import AddIcon from '$lib/icons/addIcon.svelte';
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
    <AddIcon size={34} backgroundColor={"#000"} iconColor={"#fff"} weight={4}/>
</button>

<style>
	.add-button {
        background: transparent;
        width: fit-content;
        height: fit-content;
        display:flex;
        justify-content: center;
        align-items:center;
        border: none;
        box-shadow: none;
        cursor: pointer;
	}
</style>
