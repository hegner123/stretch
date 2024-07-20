<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    import { getContext, onMount } from "svelte";
    import CloseIcon from "$lib/icons/closeIcon.svelte";

    const dispatch = createEventDispatcher();
    const setId = getContext("setId");
    export let id: number | null = null;
    export let timeMs = null;
    export let type = null;
    const timerLength = writable(0);
    const timerType = writable("stretch");
    function handleRadioChange(
        event: Event & { currentTarget: HTMLInputElement & EventTarget },
    ): void {
        const value = event.currentTarget.value;
        timerType.set(value);
    }

    function deleteTimer() {
        dispatch("deleteTimer", { detail: id });
    }
    onMount(() => {
        if (timeMs !== null) {
            timerLength.set(timeMs / 1000);
        }
    });
</script>

{#if setId !== null}
    <form data-id={id} data-timeMs={timeMs} data-type={type}>
        <button class="delete-btn" on:click={deleteTimer}>
            <CloseIcon size={36} backgroundColor={"#f00"} iconColor={"#000"} weight={4}/>
        </button>
        <div class="length-group">
            <label for="timer-length">Length (s)</label>
            <div class="length-input-group">
                <input id="timer-length" type="number" value={$timerLength} />
            </div>
        </div>
        <div class="radio-group">
            <span class="group-title">Type</span>
            <label class="setup-radio-title" for="radio-stretch">Stretch</label>
            <input
                id="radio-stretch"
                type="radio"
                name="timer-type"
                value="stretch"
                on:change={handleRadioChange}
            />
            <label class="setup-radio-title" for="radio-rest">Rest</label>
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
        position: relative;
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

    .setup-radio-title {
        font-size: 0.8rem;
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

    .delete-btn {
        position: absolute;
        width:36px;
        height:36px;
        top: -7px;
        right: -7px;
        border: none;
        padding:0;
        margin:0;
        border-radius:50%;
        cursor: pointer;
    }
</style>
