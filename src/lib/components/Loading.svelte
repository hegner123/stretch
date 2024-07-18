<div class="spinner"></div>

<style>
	.spinner {
        display:block;
        margin-top:25vh;
        margin-left:auto;
        margin-right:auto;
        padding:1rem;
        height:1rem;
        width:1rem;
        border:3px solid black;
        border-radius: 0 50% 50%;
        background:white;
        animation-name:spin;
        animation-duration:1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-play-state: var(--play-state);
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
