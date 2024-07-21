<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import Content from "$lib/components/Content.svelte";
    import Loading from "$lib/components/Loading.svelte";
    import AddTimer from "$lib/components/AddTimer.svelte";
    import AddTimerSet from "$lib/components/AddTimerSet.svelte";
    import TimerSet from "$lib/components/TimerSet.svelte";
    import TimerSetup from "$lib/components/TimerSetup.svelte";
    import { onMount, setContext } from "svelte";
    import { writable } from "svelte/store";
    const data = writable<any>("");
    const timers = writable<any>("");
    const ready = writable<boolean>(false);
    const active = writable<number | null>(null);
    const userId = writable<number | null>(null);
    const displayActive = writable<string>("");
    const isLoading = writable<boolean>(true);
    const fetchError = writable<unknown>("");

    setContext("setId", $active);
    setContext("timerOrder", {timerOrder:["1","2"]} );

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

    async function deleteTimer(timerId:number | null) {
        if (timerId === null) return;
        try {
            const url = `http://localhost:4000/api/sets/timers/${timerId}`;
            const options = {
                method:"DELETE"
            }
            const response = await fetch(url, options);
            return await response.json();
        } catch (err) {
            console.error(err);
            fetchError.set(err);
        }
    }

    async function handleDeleteTimer (e: any) {
        if ( e === null) return;
        const delRequest = await deleteTimer(e.detail.timerId)
        if ( delRequest !== null ) {
            timers.set(await fetchTimers($userId))
        }
    }

    async function handleInsert() {
        timers.set(await fetchSets($userId));
    }

    active.subscribe(async (value) => {
        ready.set(false);
        if (value !== undefined && value !== null) {
            const response = await fetchTimers(value);
            timers.set(response.body);
        }
    });
    // data.subscribe((value)=>{
    //    console.log(value)
    //})

    timers.subscribe(async (value) => {
        if (value === undefined) return;
        if (value.length > 0) ready.set(true);
    });
    onMount(async () => {
        const storageItem = sessionStorage.getItem("user");
        if (storageItem === null) return;
        const user = await JSON.parse(storageItem);
        const fetchedSets = await fetchSets(await user.id);
        const fetchedTimers = await fetchTimers(
            fetchedSets?.message.body[0].id,
        );
        if (fetchedTimers.body.length > 0) ready.set(true);
        makeActive(
            fetchedSets.message.body[0].id,
            fetchedSets.message.body[0].name,
        );
        userId.set(user.id);
        data.set(fetchedSets?.message?.body);
        timers.set(fetchedTimers?.body);
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
            {#if !$isLoading && $timers !== ""}
                <div class="setup-header">
                    <h2 class="setup-title">{$displayActive}</h2>
                    <AddTimer />
                </div>
                {#if $ready}
                    <a class="stretch" href={`/timers/${$active}`}>Stretch</a>
                {/if}
                <div class="setup-group">
                    {#if Array.isArray($timers)}
                        {#each $timers as timer}
                            <TimerSetup
                                id={timer.id}
                                timeMs={timer.timeMs}
                                type={timer.type}
                                on:deleteTimer={handleDeleteTimer}
                            />
                        {/each}
                    {:else}
                        <p>No Timers.</p>
                    {/if}
                </div>
            {:else}
                <Loading />
            {/if}
        </div>
        <div class="set-container">
            {#if !$isLoading}
                <div class="set-header">
                    <h3>Sets</h3>
                    <AddTimerSet on:dbinsert={handleInsert} />
                </div>
                <div class="timer-set-list">
                    {#if $data?.length > 1}
                        {#each $data as item}
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
                        <TimerSet
                            setId={$data[0].id}
                            name={$data[0].name}
                            on:deleteSuccess={handleInsert}
                            on:handleMakeActive={handleMakeActive}
                        >
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

    .set-container {
        grid-row: 2;
    }

    .set-header {
        display: flex;
        align-items:center;
    }

    .timer-set-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, 89.5px);
        grid-auto-columns: max-content;
        gap: 1rem;
    }

    .setup-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: min-content;
        gap: 1rem;
        grid-row: 4;
    }

    .setup-header {
        display: flex;
        align-items:center;
    }

    .setup-group {
        display: grid;
        gap: 1rem;
    }

    .stretch {
        background: var(--success);
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
            grid-row: 1;
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
            grid-row: 1;
            grid-auto-rows: max-content;
        }

        .timer-set-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .setup-group {
            display: grid;
            grid-auto-rows: max-content;
            gap: 1rem;
            grid-column: 1/-1;
        }

        .stretch {
            background: var(--success);
            color: white;
            padding: 1rem;
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
