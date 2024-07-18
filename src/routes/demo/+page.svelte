<script lang="ts">
    
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';
	import TimerSetup from '$lib/components/TimerSetup.svelte';

	async function handleTestRequest() {
        const userId = 1
		const url = `http://localhost:4000/api/sets/${userId}`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}

			const data = await response.json();
			console.log('Timer Sets and Associated Timers:', data);
			// Process the data as needed
		} catch (error) {
			console.error('There has been a problem with your fetch operation:', error);
		}
	}
</script>

<Nav />
<Content>
	<div class="demo-container">
		<h1>Demo</h1>
		<TimerSetup />
		<button on:click={handleTestRequest}>Test Request</button>
	</div>
</Content>

<style>
	.demo-container {
		grid-column: 2/-2;
	}
</style>
