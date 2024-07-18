<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Content from '$lib/components/Content.svelte';
	import { onMount } from 'svelte';

    onMount(()=>{
        console.log("I'm ready")

        return ()=>console.log("I'm done")
    })
</script>

<Nav />
<Content>

</Content>
