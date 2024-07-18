<script lang="ts">
	function handleMobileToggle() {
		console.log('toggle');
	}
</script>

<slot></slot>

<div class="copyright">
	<span>&copy;2024 Micael Hegner</span>
</div>

<style>
:global(:root){
    --page-margin:1rem;
    --nav-height: 5rem;
    --radius: 15px;
}
@media (min-width:1024px){

	:global(:root) {
        --page-margin:3rem;
	}
}
	:global(html) {
		font-family: sans-serif;
		font-size: 18px;
		color: #fff;
	}
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		max-width: 100vw;
		min-height: 100vh;
		background-color: #222;
	}

	.copyright {
		margin-top: auto;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 1rem;
	}
	.copyright span {
		text-align: center;
	}
	@media (min-width: 1024px) {
		:global(:root) {
			--page-margin: 10rem;
		}
	}
	@media (prefers-color-scheme: light) {
		:root {
			color: #213547;
			background-color: #ffffff;
		}
		:global(a:hover) {
			color: #747bff;
		}
		:global(button) {
			background-color: #f9f9f9;
		}
	}
</style>
