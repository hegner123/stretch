<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import AddTimer from "./AddTimer.svelte";
    export let title: string;
    let inputTitle: HTMLInputElement = document.createElement("input");
    let anchorElement: HTMLAnchorElement = document.createElement("a");
    const editing = writable<boolean>(false);
    const value = writable<string>("Untitled Set");

    async function updateName(){
        const response = await fetch("http://localhost:4000/api/timers")
    }

    function handleTitleClick() {
        editing.set(true);
    }

    $: {
        if (inputTitle) {
            inputTitle.focus();
        }
    }

    function handleBlur() {
        editing.set(false);
        
    }

    onMount(() => {
        if (title) {
            value.set(title);
        }
    });
</script>

{#if $editing}
    <input
        bind:this={inputTitle}
        type="text"
        class="edit-title"
        value={$value}
        on:blur={handleBlur}
    />
{:else}
    <a
        bind:this={anchorElement}
        href="/#"
        on:click|preventDefault={handleTitleClick}
    >
        <h3>{$value}</h3>
    </a>
    <AddTimer/>
{/if}

<style>
    a {
        color: white;
        text-decoration: none;
    }
    a h3 {
        font-size: 2rem;
        display: block;
        width: fit-content;
        margin-block: 0;
        font-weight: 600;
    }
    .edit-title {
        background: transparent;
        border-left: none;
        border-top: none;
        border-right: none;
        color: #fff;
        font-size: 2rem;
        font-weight: 600;
        border-radius:15px;
    }

    .edit-title:focus,
    .edit-title:focus-within,
    .edit-title:focus-visible {
        outline:none;
        background:#fff;
        color:#000;
    }

</style>
