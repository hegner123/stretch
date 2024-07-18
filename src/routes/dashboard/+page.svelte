<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import AddTimer from '$lib/components/AddTimer.svelte';
	import AddTimerSet from '$lib/components/AddTimerSet.svelte';
	import TimerSet from '$lib/components/TimerSet.svelte';
	import TimerSetup from '$lib/components/TimerSetup.svelte';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	const data = writable<any>('');
	const timers = writable<any>('');
	const active = writable<number | null>(null);
	const userId = writable<number | null>(null);
	const displayActive = writable<string>('');
	const isLoading = writable<boolean>(true);
	const hasMounted = writable<boolean>(false);
	const fetchError = writable<unknown>('');

	setContext('setId', active);

	async function fetchSets(id: number | null) {
		if (userId === null) return;
		try {
			const url = `http://localhost:4000/api/sets/${id}`;
			const response = await fetch(url);
			return await response.json();
		} catch (err) {
			console.error(err);
			fetchError.set(err);
		} finally {
			setTimeout(() => {
				isLoading.set(false);
			}, 2000);
		}
	}
	async function fetchTimers(setId: number | null) {
		if (setId === null) return;
		try {
			const url = `http://localhost:4000/api/sets/timers/${setId}`;
			const response = await fetch(url);
			return await response.json();
		} catch (err) {
			console.error(err);
			fetchError.set(err);
		}
	}

	data.subscribe(async (value) => {
		console.log('userId', $userId);
		console.log('data', $data);
		console.log('active', $active);
	});

	timers.subscribe(async (value) => {
		console.log('timers', $timers);
	});

	async function handleInsert() {
		data.set(await fetchSets($userId));
	}
	onMount(async () => {
		const storageItem = sessionStorage.getItem('user');
		if (storageItem === null) return;
		const user = await JSON.parse(storageItem);
		const fetchedSets = await fetchSets(await user.id);
		const fetchedTimers = await fetchTimers(fetchedSets?.message.body[0].id);
		console.log(fetchedTimers);
		makeActive(fetchedSets.message.body[0].id, fetchedSets.message.body[0].name);
		userId.set(user.id);
		data.set(fetchedSets);
		timers.set(fetchedTimers.body);
	});
	function handleMakeActive(e: any) {
		console.log(e);
		const { id, name } = e.detail;
		makeActive(id, name);
	}
	function makeActive(id: number, name: string) {
		active.set(id);
		displayActive.set(name);
		return { id: id, name: name };
	}
</script>

<Nav />
<Content>
	<div class="container">
		<div class="setup-container">
			{#if !$isLoading && $timers !== ''}
				<h2 class="setup-title">{$displayActive} id {$active}</h2>
				<AddTimer />
				<a class="stretch" href={`/timers/${$active}`}>Stretch</a>
				<div class="setup-group">
					{#each $timers as timer}
						<TimerSetup id={timer.id} timeMs={timer.timeMs} type={timer.type} />
					{/each}
				</div>
			{:else}
				<Loading />
			{/if}
		</div>
		<div class="set-container">
			{#if !$isLoading}
				<h3>Timer Sets</h3>
				<AddTimerSet on:dbinsert={handleInsert} />
				<div class="timer-set-list">
					{#if $data?.message?.body?.length > 1}
						{#each $data?.message?.body as item}
							<TimerSet
								on:deleteSuccess={handleInsert}
								setId={item.id}
								name={item.name}
								on:handleMakeActive={handleMakeActive}
							>
								Timer Id {item.id}
							</TimerSet>
						{/each}
					{:else}
						<TimerSet setId={$data.message.body[0].id} name={$data.message.body[0].name}>
							Timer Id {$data.message.body[0].id}
						</TimerSet>
					{/if}
				</div>
			{:else}
				<Loading />
			{/if}
		</div>
	</div>
</Content>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: max-content;
		gap: 1rem;
		margin: 0 var(--page-margin);
	}
	.setup-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: min-content;
		grid-row: 4;
	}

	.set-container {
		grid-row: 2;
	}

	.stretch {
		background: #333;
		color: white;
		border-radius: 25px;
		font-size: 2rem;
		cursor: pointer;
		border: none;
		box-shadow: none;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}
	@media (min-width: 1024px) {
		.container {
			display: grid;
			grid-column: 2/-2;
			grid-template-columns: repeat(12, 1fr);
			grid-auto-rows: min-content;
		}
		.setup-container {
			grid-column: 2/6;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: min-content;
		}

		.setup-title {
			grid-column: 1/2;
		}

		.set-container {
			display: grid;
			grid-column: -4/-2;
		}

		.timer-set-list {
			display: grid;
			gap: 1rem;
		}
		.setup-group {
			display: grid;
			grid-auto-rows: max-content;
			gap: 1rem;
			grid-column: 1/-1;
		}
		.stretch {
			background: #333;
			color: white;
			border-radius: 25px;
			font-size: 2rem;
			cursor: pointer;
			border: none;
			box-shadow: none;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
		}
	}
</style>
