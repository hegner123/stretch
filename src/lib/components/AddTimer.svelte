<script lang="ts">
    import { writable, type Stores, type Writable } from "svelte/store";
    import { createEventDispatcher, getContext } from "svelte";
    import AddIcon from "../icons/addIcon.svelte";
    const dispatch = createEventDispatcher();
    const isLoading = writable<boolean>(false);
    const insertRequest = writable<string>("");
    const fetchError = writable<unknown>("");
    const setId: Writable<Stores> = getContext("setId");
    const timerOrder: string[] = getContext("timerOrder");

    async function getUserId() {
        const storageItem = sessionStorage.getItem("user");
        if (storageItem === null) return;
        const user = JSON.parse(storageItem);
        return user.id;
    }

    async function handleInsert() {
        isLoading.set(true);
        const time = {
            timer: {
                userId: await getUserId(),
                timeMs: 0,
                type: "stretch",
            },
            timerOrder: timerOrder,
        };
        async function insertTimer(id: unknown) {
            if (id === null) return;
            try {
                const url = `http://localhost:4000/api/timer/${id}`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(time),
                });
                return await response.json();
            } catch (err) {
                console.error(err);
            }
        }
        try {
            insertRequest.set(await insertTimer($setId));
            dispatch("dbinsert", { status: "success" });
        } catch (err) {
            console.error(err);
            fetchError.set(err);
        } finally {
            isLoading.set(false);
        }
    }
</script>

<button class="add-button" on:click={handleInsert}>
    <AddIcon size={34} backgroundColor={"#000"} iconColor={"#fff"} weight={4} />
</button>

<style>
    .add-button {
        background: transparent;
        width: fit-content;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }
</style>
