<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	import { getContext } from 'svelte';
	const setId = getContext('setId');
	export let id = null;
	export let timeMs = null;
    export let type = null;
	const timerLength = writable(0);
	const timerType = writable('stretch');
	function handleRadioChange(
		event: Event & { currentTarget: HTMLInputElement & EventTarget }
	): void {
		const value = event.currentTarget.value;
		timerType.set(value);
	}
</script>

{#if setId !== null}
	<form data-id={id} data-timeMs={timeMs} data-type={type}>
		<div class="length-group">
			<label for="timer-length">Length</label>
			<div class="length-input-group">
				<input id="timer-length" type="number" value={$timerLength} />
				<span class="length-input-unit">s</span>
			</div>
		</div>
		<div class="radio-group">
			<span class="group-title">Type</span>
			<label for="radio-stretch">Stretch</label>
			<input
				id="radio-stretch"
				type="radio"
				name="timer-type"
				value="stretch"
				on:change={handleRadioChange}
			/>
			<label for="radio-rest">Rest</label>
			<input
				id="radio-rest"
				type="radio"
				name="timer-type"
				value="rest"
				on:change={handleRadioChange}
			/>
		</div>
	</form>
{/if}

<style>
	form {
		grid-column: 2/-2;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
		max-width: 400px;
		background: #f7f7f7;
		padding: 1rem;
		border-radius: var(--radius);
	}
	label {
		color: black;
	}

	.length-group {
		display: grid;
		column-gap: 1rem;
		row-gap: 0.5rem;
	}
	.length-input-group {
		display: flex;
	}

	.length-input-unit {
		color: #000;
	}
	.radio-group {
		display: grid;
		grid-template-columns: max-content min-content;
		column-gap: 1rem;
		row-gap: 0.5rem;
	}
	.group-title {
		grid-column: 1/-1;
		color: black;
	}
</style>
