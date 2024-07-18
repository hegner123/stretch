<script lang="ts">
export let columns = 1;
</script>

<section class="content-section" style="--section-columns:{columns}">
	<slot></slot>
</section>

<style>
	.content-section {
		min-height: calc(90vh - var(--nav-height));
		display: grid;
        grid-template-columns:1fr;
        grid-auto-rows: max-content;
	}

    @media (min-width:1024px){
        .content-section {
            grid-template-columns: repeat(var(--section-columns), 1fr);

        }
    }
</style>
