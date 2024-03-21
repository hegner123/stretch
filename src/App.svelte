<script lang="ts" defer>
    import type { MouseEventHandler } from "svelte/elements";

    let timerElement: HTMLInputElement | null = null;
    let startButtonElement: HTMLButtonElement | null = null;
    let stopButtonElement: HTMLButtonElement | null = null;
    let restartButtonElement: HTMLButtonElement | null = null;
    let handleStopButton: MouseEventHandler<HTMLButtonElement> | null = null;
    let handleRestartButton: MouseEventHandler<HTMLButtonElement> | null = null;
    let timerLength = 0;
    let timer = 0;

    function handleInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        timerLength = parseInt(target.value);
    }

    function handleFocus(e: Event) {
        if (
            timerLength === null ||
            timerElement === null ||
            startButtonElement === null
        ) {
            return;
        }
        timerElement.select();
    }
    function handleEnterKeyPress(e: KeyboardEvent) {
        if (startButtonElement !== null && e.key === "Enter") {
            runRepeatedTimer();
            startButtonElement.focus();
        }
    }

    function showStopButton() {
        if (stopButtonElement === null) {
            return;
        }
        stopButtonElement.style.visibility = "visible";
        stopButtonElement.style.position = "relative";
    }

    function hideStopButton() {
        if (stopButtonElement === null) {
            return;
        }
        stopButtonElement.style.visibility = "hidden";
        stopButtonElement.style.position = "absolute";
    }

    function showStartButton() {
        if (startButtonElement === null) {
            return;
        }
        startButtonElement.style.visibility = "visible";
        startButtonElement.style.position = "relative";
    }

    function hideStartButton() {
        if (startButtonElement === null) {
            return;
        }
        startButtonElement.style.visibility = "hidden";
        startButtonElement.style.position = "absolute";
    }

    function showRestartButtonElement() {
        if (restartButtonElement === null) {
            return;
        }
        restartButtonElement.style.visibility = "visible";
        restartButtonElement.style.position = "relative";
    }

    function hideRestartButtonElement() {
        if (restartButtonElement === null) {
            return;
        }
        restartButtonElement.style.visibility = "hidden";
        restartButtonElement.style.position = "absolute";
    }

    function runRepeatedTimer() {
        console.log("click");
        if (timerElement === null) {
            return;
        }

        timerElement.disabled = true;
        showRestartButtonElement();
        showStopButton();
        hideStartButton();
        const length = timerLength;
        try {
            const runningTimer: {
                handleStopButton: MouseEventHandler<HTMLButtonElement>;
                handleRestartButton: MouseEventHandler<HTMLButtonElement>;
            } = runTimer(
                length.toString(),
                stopButtonElement,
                restartButtonElement,
            );

            handleStopButton = runningTimer.handleStopButton;
            handleRestartButton = runningTimer.handleRestartButton;
        } catch (e) {
            console.error(e);
        }
    }

    function updateTimer(val: number) {
        if (timerElement === null) {
            return;
        }
        timer = val;
    }

    function runTimer(
        length: string,
        stopButtonElement: HTMLButtonElement | null,
        restartButtonElement: HTMLButtonElement | null,
    ): {
        handleStopButton: MouseEventHandler<HTMLButtonElement>;
        handleRestartButton: MouseEventHandler<HTMLButtonElement>;
    } {
        if (
            timerLength === null ||
            stopButtonElement === null ||
            restartButtonElement === null
        ) {
            throw new Error(
                "Timer length, stop button, or restart button is null",
            );
        }
        let timeSpan = parseInt(length) + 1;

        const stretchTimer = setInterval(
            function () {
                timeSpan = timeSpan - 1;
                updateTimer(timeSpan);
                if (timeSpan === 0) {
                    clearInterval(stretchTimer);
                    runTimer(length, stopButtonElement, restartButtonElement);
                }
            },
            1000,
            stopButtonElement,
        );
        function handleStopButton() {
            if (
                timerLength === null ||
                stopButtonElement === null ||
                restartButtonElement === null ||
                timerElement === null
            ) {
                return;
            }
            clearInterval(stretchTimer);
            hideRestartButtonElement();
            hideStopButton();
            showStartButton();
            timerElement.disabled = false;
        }
        function handleRestartButton() {
            clearInterval(stretchTimer);
            runTimer(length, stopButtonElement, restartButtonElement);
        }
        return { handleStopButton, handleRestartButton };
    }
</script>

<div class="container">
    <h1 class="timer">{timer}</h1>
    <div class="form-group">
        <label class="length-label" for="length">Length</label>
        <input
            on:focus={handleFocus}
            on:change={handleInputChange}
            on:keydown={handleEnterKeyPress}
            bind:this={timerElement}
            class="length-input"
            type="number"
            name="length"
            id="length"
            value="0"
        />
    </div>
    <div class="form-group-2">
        <button
            class="start-stretch"
            on:click={runRepeatedTimer}
            bind:this={startButtonElement}>Start</button
        >
        <button
            class="restart-stretch"
            on:click={handleRestartButton}
            bind:this={restartButtonElement}>Restart</button
        >
        <button
            class="stop-stretch"
            on:click={handleStopButton}
            bind:this={stopButtonElement}>Stop</button
        >
    </div>
</div>

<style>
    :global(html) {
        font-family: sans-serif;
        font-size: 24px;
        color: #fff;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-color: #222;
    }

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .timer {
        text-align: center;
        font-size: 5rem;
        grid-column: 1 / 3;
        grid-row: 1;
    }

    .form-group {
        grid-column: 1 / 3;
        grid-row: 2;
    }

    .form-group-2 {
        grid-column: 1 / 3;
        grid-row: 3;
        text-align: center;
        margin-bottom: 2rem;
    }

    .start-stretch {
        padding: 1rem;
    }

    .stop-stretch {
        padding: 1rem;
        visibility: hidden;
        position: absolute;
    }

    .restart-stretch {
        padding: 1rem;
        visibility: hidden;
        position: absolute;
    }
</style>
