<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import Content from "$lib/components/Content.svelte";
    import Loading from "$lib/components/Loading.svelte";
    import AddTimer from "$lib/components/AddTimer.svelte";
    import AddTimerSet from "$lib/components/AddTimerSet.svelte";
    import TimerSet from "$lib/components/TimerSet.svelte";
    import TimerSetup from "$lib/components/TimerSetup.svelte";
    import TitleEdit from "$lib/components/TitleEdit.svelte";
    import EditIcon from "$lib/icons/editIcon.svelte";
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
    const isEditing = writable<boolean>(false);
    const editingSets = writable<boolean>(false)

    setContext("setId", $active);
    setContext("timerOrder", { timerOrder: ["1", "2"] });
    setContext("isEditing", isEditing);

    async function fetchSets(id: number | null) {
        if (userId === null) return;
        try {
            const url = `http://localhost:4000/api/timersets/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Ensure no invalid headers like ':method' are included
                },
            });
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
    async function fetchClientAPI() {
        try {
            const url = `/api/test`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Ensure no invalid headers like ':method' are included
                },
            });
            return await response.text();
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchTimers(setId: number | null) {
        if (setId === null) return;
        try {
            const url = `http://localhost:4000/api/timersets/timers/${setId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Ensure no invalid headers like ':method' are included
                },
            });
            return await response.json();
        } catch (err) {
            console.error(err);
            fetchError.set(err);
        }
    }

    async function deleteTimer(timerId: number | null) {
        if (timerId === null) return;
        try {
            const url = `http://localhost:4000/api/timersets/timers/${timerId}`;
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // Ensure no invalid headers like ':method' are included
                },
            };
            const response = await fetch(url, options);
            return await response.json();
        } catch (err) {
            console.error(err);
            fetchError.set(err);
        }
    }

    async function handleDeleteTimer(e: any) {
        if (e === null) return;
        const delRequest = await deleteTimer(e.detail.timerId);
        if (delRequest !== null) {
            timers.set(await fetchTimers($userId));
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
    data.subscribe((value) => {
        if (value !== "") {
            console.log(value);
        }
    });

    timers.subscribe(async (value) => {
        if (value === undefined) return;
        if (value.length > 0) ready.set(true);
    });
    onMount(async () => {
        const storageItem = sessionStorage.getItem("user");
        if (storageItem === null) return;
        const user = await JSON.parse(storageItem);
        const fetchedSets = await fetchSets(await user.id);
        let fetchedTimers;
        if (fetchedSets.body) {
            fetchedTimers = await fetchTimers(fetchedSets?.body[0].id);
        }
        if (fetchedTimers?.body?.length > 0) ready.set(true);
        makeActive(fetchedSets?.body[0]?.id, fetchedSets?.body[0]?.name);
        userId.set(user.id);
        data.set(fetchedSets?.body);
        timers.set(fetchedTimers ? fetchedTimers?.body : []);
        fetchClientAPI();
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

    function handleEditSets(){
        editingSets.set($editingSets)
    }
</script>

<Nav />
<Content>
    <div class="container">
        <div class="setup-container">
            {#if !$isLoading && $timers !== ""}
                {#if $active !== null}
                    <div class="setup-header">
                        <TitleEdit title={$displayActive} tag={"h3"} parentEditing={null}>
                            <AddTimer />
                        </TitleEdit>
                    </div>
                {/if}
                {#if $ready && $timers.length > 0}
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
                    <button on:click={handleEditSets}>Edit</button>
                </div>
                <div class="timer-set-list">
                    {#if $data && $data?.length > 1}
                        {#each $data as item}
                            <TimerSet
                                on:deleteSuccess={handleInsert}
                                setId={item.id}
                                name={item.name}
                                on:handleMakeActive={handleMakeActive}
                                editingSets={$editingSets}
                            />
                        {/each}
                    {:else if $data?.length === 1}
                        <TimerSet
                            setId={$data[0].id}
                            name={$data[0].name}
                            on:deleteSuccess={handleInsert}
                            on:handleMakeActive={handleMakeActive}
                            editingSets={$editingSets}
                        />
                    {:else}
                        <p>No Sets</p>
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
        align-items: center;
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
        align-items: center;
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
            grid-column: 2/7;
            grid-row: 1;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: min-content;
        }

        .setup-header {
            grid-column: 1/-1;
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
