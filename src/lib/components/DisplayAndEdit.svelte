<script lang="ts">
    import { writable } from "svelte/store";
    const editing = writable<boolean>(false);
    const value = writable<string>("");
</script>

{#if editing}
    <input type="text" />
{:else}
    <h3>{$value}</h3>
{/if}
