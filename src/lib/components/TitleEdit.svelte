<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import AddTimer from "./AddTimer.svelte";
    export let title: string;
    export let tag: string;
    export let parentEditing: boolean|null;
    let inputTitle: HTMLInputElement = document.createElement("input");
    let anchorElement: HTMLAnchorElement = document.createElement("a");
    const editing = writable<boolean>(false);
    const value = writable<string>("Untitled Set");

    async function updateName() {
        const response = await fetch("http://localhost:4000/api/timers");
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

    function preventClick() {
        return;
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
        class={`edit-title ${parentEditing ? "editing" : ""}`}
        value={$value}
        on:blur={handleBlur}
    />
{:else}
    <a
        class="title-handler"
        bind:this={anchorElement}
        href="/#"
        on:click|preventDefault={preventClick}
        on:dblclick|preventDefault={handleTitleClick}
    >
        {#if tag === "h1"}
            <h1 class={`${tag}-title`}>{$value}</h1>
        {:else if tag === "h2"}
            <h2 class={`${tag}-title`}>{$value}</h2>
        {:else if tag === "h3"}
            <h3 class={`${tag}-title`}>{$value}</h3>
        {:else if tag === "h4"}
            <h4 class={`${tag}-title`}>{$value}</h4>
        {:else if tag === "h5"}
            <h5 class={`${tag}-title`}>{$value}</h5>
        {:else if tag === "h6"}
            <h6 class={`${tag}-title`}>{$value}</h6>
        {:else if tag === "p"}
            <p class={`${tag}-title`}>{$value}</p>
        {:else}
            <p class={`${tag}-title`}>{$value}</p>
        {/if}
    </a>
    <slot></slot>
{/if}

<style>
    a {
        text-decoration: none;
        color: #fff;
    }

    a.title-handler .h3-title,
    .edit-title {
        font-size: 2rem;
        display: block;
        width: fit-content;
        margin-block: 0;
        font-weight: 600;
    }
    .edit-title {
        display: block;
        background: transparent;
        border-left: none;
        border-top: none;
        border-right: none;
        color: #fff;
        font-size: 2rem;
        font-weight: 600;
        border-radius: 15px;
        padding: 0 1rem;
    }

    .edit-title:focus,
    .edit-title:focus-within,
    .edit-title:focus-visible {
        outline: none;
        background: #fff;
        color: #000;
    }
</style>
