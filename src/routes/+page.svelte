<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />
<Content columns={12}>
	<h1 class="title">Stretch timer</h1>
	<p class="title-description">
		Unlock your full potential with our Stretch Application, the ultimate tool for seamlessly
		planning and executing your stretching routines. Designed with your focus in mind, our app lets
		you concentrate on the benefits of each stretch while we take care of the timing.
	</p>
	<div class="card-section">
		<h3 class="card-section-title">Key Features:</h3>
		<div class="card card-1">
			<h4 class="card-title">Two Versatile Timers:</h4>
			<p class="card-description">
				Choose between Stretch and Rest timers to structure your sessions perfectly. The Stretch
				timer helps you maintain each position for the optimal duration, while the Rest timer gives
				you the necessary breaks.
			</p>
		</div>
		<div class="card card-2">
			<h4 class="card-title">Customizable Intervals:</h4>
			<p class="card-description">
				Personalize your routine with global rest settings or tailor your session with custom rest
				timers. Whether you're easing into a new stretch or pushing your limits, our app adapts to
				your needs.
			</p>
		</div>
		<div class="card card-3">
			<h4 class="card-title">Effortless Planning:</h4>
			<p class="card-description">
				Spend less time managing timers and more time enjoying the benefits of stretching. Our
				intuitive interface makes setting up your routine a breeze, so you can get started quickly
				and efficiently.
			</p>
		</div>
	</div>
	<p class="closing">
		Transform your stretching practice with the Stretch Application. Focus on your flexibility and
		leave the timing to us. Download now and elevate your routine!
	</p>
</Content>

<style>
	h1.title {
		margin-left: var(--page-margin);
		margin-right: var(--page-margin);
	}
	p.title-description {
		margin-left: var(--page-margin);
		margin-right: var(--page-margin);
		max-width: 56rem;
	}
	.card-section-title {
		margin-left: var(--page-margin);
		margin-right: var(--page-margin);
	}
	.card-section {
		display: grid;
		margin-bottom: 2rem;
	}
	.card {
		background: #000;
		padding: 0.5rem 2rem;
		border-radius: 15px;
	}
	.card.card-1 {
		grid-column: 1/-1;
	}

	.card.card-2 {
		grid-column: 1/-1;
	}
	.card.card-3 {
		grid-column: 1/-1;
	}

	.closing {
		margin: 0 var(--page-margin) 4rem;
	}

	@media (min-width: 1024px) {
		h1.title {
			grid-column: 1/-1;
			margin-left: var(--page-margin);
			margin-right: var(--page-margin);
		}
		p.title-description {
			grid-column: 1/-1;
			margin-left: var(--page-margin);
			margin-right: var(--page-margin);
			max-width: 56rem;
		}
		.card-section {
			grid-template-columns: repeat(12, 1fr);
			grid-column: 1/-1;
		}

		.card-section-title {
			grid-column: 1/-1;
		}
		.card.card-1 {
			grid-column: 3/5;
		}
		.card.card-2 {
			grid-column: 6/8;
		}
		.card.card-3 {
			grid-column: 9/11;
		}

        .closing {
            grid-column:1/-1;
        }
	}
</style>
