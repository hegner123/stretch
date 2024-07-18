<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let setId: number;
	export let name = '';
    async function handleDispatchMakeActive(){
        console.log("click")
        dispatch("handleMakeActive", {id:setId, name:name})
    }
	async function deleteSet(id: number) {
		const url = 'http://localhost:4000/api/sets/' + id;
		const response = await fetch(url, { method: 'DELETE' });
		dispatch('deleteSuccess', { response });
	}
	function handleDelete() {
		deleteSet(setId);
	}
</script>

<article class="card" data-set-id={setId}>
	<button class="link" on:click={handleDispatchMakeActive}>
		<slot></slot>
	</button>
	<button class="btn-delete" on:click={handleDelete}>Delete</button>
</article>

<style>
	.card {
		background: #333;
		padding: 1rem 0.5rem;
		max-width: 90vw;
        width:max-content;
		border-radius: 15px;
		display: grid;
	}
	button.link {
		color: #fff;
        background:transparent;
        border:none;
        box-shadow:none;
		text-decoration: none;
        cursor: pointer;
	}

	.btn-delete {
		background: #ff5555;
		color: black;
		border: none;
		box-shadow: none;
		border-radius: 15px;
		padding: 0.5rem 0.25rem;
		font-size: 1rem;
		cursor: pointer;
		margin-top: 1rem;
	}
</style>
