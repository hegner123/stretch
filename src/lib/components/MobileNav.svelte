<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import MenuOpen from '$lib/icons/menuOpen.svelte';
	import MenuClose from '$lib/icons/menuClose.svelte';

	const open = writable<boolean>(false);
	const dispatch = createEventDispatcher();

	function handleMenuToggle() {
		dispatch('mobileToggle', { $open });
		open.set(!$open);
	}
</script>

{#if $open}
	<button class="listener" on:click={handleMenuToggle}>
		<MenuClose />
	</button>
{:else}
	<button class="listener" on:click={handleMenuToggle}>
		<MenuOpen />
	</button>
{/if}

<style>
	button.listener {
		background: transparent;
		border: none;
		box-shadow: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}
</style>
