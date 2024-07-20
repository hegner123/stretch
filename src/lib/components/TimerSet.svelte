<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import CloseIcon from '$lib/icons/closeIcon.svelte';
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
	<button class="btn-delete" on:click={handleDelete}>
        <CloseIcon size={36} backgroundColor={"#f00"} iconColor={"#000"} weight={4}/>
    </button>
</article>

<style>
	.card {
		background: #333;
		padding: 1rem 0.5rem;
		max-width: 90vw;
        width:max-content;
		border-radius: 15px;
		display: grid;
        position:relative;
	}
	button.link {
		color: #fff;
        background:transparent;
        border:none;
        box-shadow:none;
		text-decoration: none;
        cursor: pointer;
        margin-top:1rem;
	}

    button.link:hover{
        text-decoration: underline;

    }

	.btn-delete {
        position: absolute;
        top:-7px;
        right:-7px;
        background:transparent;
		border: none;
        width:36px;
        height:36px;
        margin:0;
        padding:0;
		box-shadow: none;
		border-radius: 50%;
		cursor: pointer;
	}
</style>
