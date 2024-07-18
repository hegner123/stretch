<script lang="ts" defer>
	import { onMount } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import { writable } from 'svelte/store';
	export let data: any;
	const pageData = writable<any>();
	const started = writable<boolean>(false);
	let timerElement: HTMLInputElement | null = null;
	let startButtonElement: HTMLButtonElement | null = null;
	let stopButtonElement: HTMLButtonElement | null = null;
	let restartButtonElement: HTMLButtonElement | null = null;
	let handleStopButton: MouseEventHandler<HTMLButtonElement> | null = null;
	let handleRestartButton: MouseEventHandler<HTMLButtonElement> | null = null;
	let timerLength = 0;
	let timer = 0;

	async function fetchTimersAndOrder() {
		const url = `http://localhost:4000/api/sets/timers/order/${data.set}`;
		try {
			const response = await fetch(url);
			if (response.ok) {
				let dataJson = await response.json();
				return await dataJson;
			}
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	pageData.subscribe((value) => {
		if (value !== undefined) {
		}
	});
	function runRepeatedTimer() {
		if (timerElement === null) {
			return;
		}

		timerElement.disabled = true;
		const length = timerLength;
		try {
			const runningTimer: {
				handleStopButton: MouseEventHandler<HTMLButtonElement>;
				handleRestartButton: MouseEventHandler<HTMLButtonElement>;
			} = runTimer(length.toString(), stopButtonElement, restartButtonElement);

			handleStopButton = runningTimer.handleStopButton;
			handleRestartButton = runningTimer.handleRestartButton;
		} catch (e) {
			console.error(e);
		}
	}

	function updateTimer(val: number) {
		if (timerElement === null) {
			return;
		}
		timer = val;
	}

	function runTimer(
		length: string,
		stopButtonElement: HTMLButtonElement | null,
		restartButtonElement: HTMLButtonElement | null
	): {
		handleStopButton: MouseEventHandler<HTMLButtonElement>;
		handleRestartButton: MouseEventHandler<HTMLButtonElement>;
	} {
		if (timerLength === null || stopButtonElement === null || restartButtonElement === null) {
			throw new Error('Timer length, stop button, or restart button is null');
		}
		let timeSpan = parseInt(length) + 1;

		const stretchTimer = setInterval(
			function () {
				timeSpan = timeSpan - 1;
				updateTimer(timeSpan);
				if (timeSpan === 0) {
					clearInterval(stretchTimer);
					runTimer(length, stopButtonElement, restartButtonElement);
				}
			},
			1000,
			stopButtonElement
		);

		function handleStopButton() {
			if (
				timerLength === null ||
				stopButtonElement === null ||
				restartButtonElement === null ||
				timerElement === null
			) {
				return;
			}
			clearInterval(stretchTimer);
			timerElement.disabled = false;
		}
		function handleRestartButton() {
			clearInterval(stretchTimer);
			runTimer(length, stopButtonElement, restartButtonElement);
		}
		return { handleStopButton, handleRestartButton };
	}

	onMount(async () => {
		pageData.set(await fetchTimersAndOrder());
	});
</script>

<div class="container">
	{#if Array.isArray($pageData?.body)}
		<ul>
			{#each $pageData?.body as time}
				<li>
					<p>{time.timeMs}</p>
				</li>
			{/each}
		</ul>
	{/if}
	<div class="form-group">
		<h1 class="timer">{timer}</h1>
	</div>
	<div class="form-group-2">
		{#if !$started}
			<button class="start-stretch" on:click={runRepeatedTimer} bind:this={startButtonElement}>
				Start
			</button>
		{:else}
			<button
				class="restart-stretch"
				on:click={handleRestartButton}
				bind:this={restartButtonElement}
			>
				Restart
			</button>
			<button class="stop-stretch" on:click={handleStopButton} bind:this={stopButtonElement}>
				Stop
			</button>
		{/if}
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-column: 1/-1;
		grid-auto-rows: min-content;
	}

	.form-group {
		display: grid;
		grid-column: 4 / -4;
		grid-auto-rows: min-content;
		justify-content: center;
	}

	.form-group-2 {
		display: grid;
		justify-content: center;
		grid-column: 4 / -4;
		text-align: center;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
	.timer {
		text-align: center;
		font-size: 5rem;
	}

	.start-stretch {
		border-radius: 15px;
		font-size: 1rem;
		padding: 1rem;
	}

	.stop-stretch {
		padding: 1rem;
		font-size: 1rem;
		visibility: hidden;
		position: absolute;
	}

	.restart-stretch {
		padding: 1rem;
		font-size: 1rem;
		visibility: hidden;
		position: absolute;
	}
</style>
