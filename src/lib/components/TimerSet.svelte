<script lang="ts">
    import { createEventDispatcher, getContext } from "svelte";
    import { writable, type Stores, type Writable } from "svelte/store";
    import TitleEdit from "./TitleEdit.svelte";
    import CloseIcon from "$lib/icons/closeIcon.svelte";
    const dispatch = createEventDispatcher();
    export let setId: number;
    export let name = "";
    export let editingSets: boolean;
    const isEditing: Writable<Stores> = getContext("isEditing");

    async function handleDispatchMakeActive() {
        dispatch("handleMakeActive", { id: setId, name: name });
    }

    async function deleteSet(id: number) {
        const url = "http://localhost:4000/api/sets/" + id;
        const response = await fetch(url, { method: "DELETE" });
        dispatch("deleteSuccess", { response });
    }

    function handleDelete() {
        deleteSet(setId);
    }

</script>

<article class={`card ${$isEditing ? "edit" : ""}`} data-set-id={setId}>
    <a
        href="/#"
        class="link"
        on:click|preventDefault={handleDispatchMakeActive}
    >
        <TitleEdit
            title={name}
            tag={"p"}
            parentEditing={editingSets}
        />
    </a>
    {#if $isEditing}
        <button class="btn-delete" on:click={handleDelete}>
            <CloseIcon
                size={36}
                backgroundColor={"#f00"}
                iconColor={"#000"}
                weight={4}
            />
        </button>
    {/if}
</article>

<style>
    .card {
        background: #333;
        max-width: 90vw;
        width: 100%;
        border-radius: 15px;
        display: grid;
        position: relative;
    }
    .card.editing a.link {
        margin-top: 1rem;
    }

    a.link {
        color: #fff;
        background: transparent;
        border: none;
        box-shadow: none;
        width: 100%;
        height: 100%;
        text-decoration: none;
        cursor: pointer;
        padding: 0 1rem;
    }

    a.link:hover {
        text-decoration: underline;
    }

    .btn-delete {
        position: absolute;
        top: -7px;
        right: -7px;
        background: transparent;
        border: none;
        width: 36px;
        height: 36px;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 50%;
        cursor: pointer;
    }
</style>
