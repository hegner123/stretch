<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Nav />
<Content>
	<Timer data={data}/>
</Content>
